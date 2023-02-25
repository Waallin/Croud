import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { database } from "../../Firebase/firebase";
import { Location, Permissions } from "expo";
import OrgComponent from "./UserComponents/OrgComponent";
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { globalStyles } from "../../Styles/global";

const NearbyGamesView = (route) => {
  const currentDate = new Date();
  //while get your location we show a spinner
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState();
  let today = currentDate.toISOString().split("T")[0];

  const [teams, setTeams] = useState([]);
  useEffect(() => {
    if (route.location) {
      getData();
      setIsLoading(false);
    }
  }, [route.location]);

  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //function from gpt to get the distance between two points with the Haversine-formel
  async function getData() {
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
          longitude: 17.09635300806849

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
        if (distance < 50) {
          nTeams.push(team);
        }
      });
      let dateFilter = nTeams.sort(function (a, b) {
        return new Date(a.Gameday) - new Date(b.Gameday);
      });
      setTeams(dateFilter);
    }
    console.log(teams)
  }

  return (
    <View style={globalStyles.primaryContainer}>
      {isLoading ? (
        <View style={styles.loadingIcon}>
          <Text style={styles.waitText}>Vänta lite medans vi hämtar din plats</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          style={styles.gamesContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {teams.map((org) => {
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
    justifyContent: "center"
  },

  waitText: {
    fontSize: "24px",
    fontWeight: "500",
    marginBottom: 30
  }
});
