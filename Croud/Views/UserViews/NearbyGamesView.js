import {
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { database } from "../../Firebase/firebase";
import { Ionicons } from "@expo/vector-icons";
import OrgComponent from "./UserComponents/OrgComponent";
import Modal from "react-native-modal";

import { query, collection, getDocs } from "firebase/firestore";
import { globalStyles } from "../../Styles/global";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const NearbyGamesView = (route) => {
  const userData = route.userData;
  const currentDate = new Date();
  //while get your location we show a spinner
  const [isLoading, setIsLoading] = useState(true);
  let today = currentDate.toISOString().split("T")[0];

  const [teams, setTeams] = useState([]);
  const [sortedTeams, setSortedTeams] = useState([]);
  const [sortedSports, setSortedSports] = useState("Fotboll");
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.location) {
      getData();
      setIsLoading(false);
    }
  }, [route.location, userData]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //function from gpt to get the distance between two points with the Haversine-formel
  async function getData() {
    console.log(route.userData);
    // const point1 = { latitude: location.coords.latitude, longitude: location.coords.longitude};
    ///////
    //function to filter out the nearest game
    const nTeams = [];
    const q = query(collection(database, "Organisations"));
    const querySnapshot = await getDocs(q);
    let teams = [];
    querySnapshot.forEach((doc) => {
      function nearestGameDay() {
        const dates = doc.data().Gamedays;
        let x = dates
          .filter((date) => new Date(date) >= currentDate || date === today)
          .sort((a, b) => new Date(a) - new Date(b));
        return x[0];
      }

      let obj = {
        Address: doc.data().Address,
        City: doc.data().City,
        Name: doc.data().Name,
        Place: doc.data().Place,
        Sport: doc.data().Sport,
        Swish: doc.data().Swish,
        ZipCode: doc.data().ZipCode,
        Latitude: doc.data().Latitude,
        Longitude: doc.data().Longitude,
        Gameday: nearestGameDay(),
      };
      if (nearestGameDay()) {
        teams.push(obj);
      }
    });
    /////////
    if (route != null) {
      teams.forEach((team) => {
        const R = 6371;
        const point1 = {
          //users coordinates

          //vallvägen:
          latitude: 61.71954853271528,
          longitude: 17.09635300806849,

          //latitude: route.location.coords.latitude,
          //longitude: route.location.coords.longitude,
        };
        const point2 = { latitude: team.Latitude, longitude: team.Longitude };
        const lat1 = point1.latitude;
        const lon1 = point1.longitude;
        const lat2 = point2.latitude;
        const lon2 = point2.longitude;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        //console.log(distance);
        if (distance < route.userData.Distance * 10) {
          nTeams.push(team);
        }
      });
      let dateFilter = nTeams.sort(function (a, b) {
        return new Date(a.Gameday) - new Date(b.Gameday);
      });
      setTeams(dateFilter);
      setSortedTeams(dateFilter);
    }
  }

  function sortbysport(a) {
    if (a == "none") {
      setSortedTeams(teams);
      setModalVisible(!isModalVisible);
    } else {
      let x = teams.filter((i) => i.Sport == a);
      setSortedTeams(x);
      setModalVisible(!isModalVisible);
    }
  }

  return (
    <View style={globalStyles.primaryContainer}>
      {isLoading ? (
        <View style={styles.loadingIcon}>
          <ActivityIndicator size="small" color={globalStyles.primaryGreen} />
        </View>
      ) : (
        <ScrollView
          style={styles.gamesContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {sortedTeams.map((org) => {
            return (
              <OrgComponent
                key={org.Name}
                Name={org.Name}
                Sport={org.Sport}
                org={org}
                date={org.Gameday}
                userData={route.userData}
              />
            );
          })}
        </ScrollView>
      )}
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity>
          <Ionicons
            name="football"
            size={40}
            color="#20C997"
            style={{ padding: 10 }}
            onPress={() => setModalVisible(!isModalVisible)}
          />
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => sortbysport("Fotboll")}
            style={{
              borderWidth: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
            }}
          >
            <Ionicons
              name="football"
              size={40}
              color="#20C997"
              style={{ padding: 10 }}
            />
            <Text
              style={{
                ...globalStyles.primaryBtnText,
                fontSize: "20px",
                paddingRight: 15,
              }}
            >
              Fotboll
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sortbysport("Innebandy")}
            style={{
              borderWidth: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Ionicons
              name="football"
              size={40}
              color="#20C997"
              style={{ padding: 10 }}
            />
            <Text
              style={{
                ...globalStyles.primaryBtnText,
                fontSize: "20px",
                paddingRight: 15,
              }}
            >
              Innebandy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sortbysport("none")}
            style={{
              borderWidth: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Ionicons
              name="football"
              size={40}
              color="#20C997"
              style={{ padding: 10 }}
            />
            <Text
              style={{
                ...globalStyles.primaryBtnText,
                fontSize: "20px",
                paddingRight: 15,
              }}
            >
              Alla
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default NearbyGamesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },

  gamesContainer: {
    marginTop: 5,
  },

  loadingIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  waitText: {
    fontSize: "24px",
    fontWeight: "500",
    marginBottom: 30,
  },
});
