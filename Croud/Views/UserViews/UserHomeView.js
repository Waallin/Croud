import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { database } from "../../Firebase/firebase";
import { Entypo } from "@expo/vector-icons";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  querySnapshot,
  getDoc,
} from "firebase/firestore";
import GamesComponent from "./UserComponents/GamesComponent";
import * as Location from "expo-location";
const UserHomeView = ({ route }) => {
  const [games, setGames] = useState([]);
  const [FavouriteGames, setFavouriteGames] = useState([]);
  const [nearbyGames, setNearbyGames] = useState([]);
  const [nearby, setNearby] = useState(false);
  const [nearbyTeams, setNearbyTeams] = useState([]);

  useEffect(() => {
    getPermissions();
    getGames();
  }, [database]);

  async function getPermissions() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("please grant location permissions");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    console.log("locations:");
    console.log(currentLocation);
  }
  //Update db when scroll down
  const [refreshing, setRefreshing] = React.useState(false);
  const [location, setLocation] = useState();
  async function getGames() {
    setGames([]);
    let favs = "";
    const docRef = doc(database, "Users", route.userData.Username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      favs = docSnap.data().Favourites;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    favs.forEach((team) => {
      data(team);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getGames();
    }, 2000);
  }, []);

  async function data(team) {
    const q = query(
      collection(database, "Games"),
      where("Hometeam", "==", team)
    );
    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      let obj = {
        id: doc.id,
        hometeam: doc.data().Hometeam,
        opponent: doc.data().Opponent,
        time: doc.data().Time,
        day: doc.data().Day,
        location: doc.data().Location,
        sport: doc.data().sport,
      };
      setGames((oldGames) => [...oldGames, obj]);
      setFavouriteGames((oldGames) => [...oldGames, obj]);
    });
    /*
    let dateFilter = games.sort(function (a, b) {
        return new Date(a.day) - new Date(b.day);
      });
      setGames(dateFilter);    
      */
  }

  //function from gpt to get the distance between two points with the Haversine-formel
  async function test() {

    // const point1 = { latitude: location.coords.latitude, longitude: location.coords.longitude};
    ///////
    const nTeams = [];
    const q = query(collection(database, "Organisations"));
    const querySnapshot = await getDocs(q);
    let teams = [];
    querySnapshot.forEach((doc) => {
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
      };
      teams.push(obj);
    });
    /////////

    teams.forEach((team) => {
      const R = 6371; // jordens radie i km
      const point1 = {
        latitude: 61.71945463793123,
        longitude: 17.096468516866626,
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
      setNearbyTeams(nTeams);
    });
    nearbyTeams.forEach((team) => {
      getNearbyMatches(team);
    });
  }

  //get nearby matches after function above
  async function getNearbyMatches(team) {
    const q = query(
      collection(database, "Games"),
      where("Hometeam", "==", team.Name)
    );
    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      let obj = {
        id: doc.id,
        hometeam: doc.data().Hometeam,
        opponent: doc.data().Opponent,
        time: doc.data().Time,
        day: doc.data().Day,
        location: doc.data().Location,
        sport: doc.data().sport,
      };
      x.push(obj);
    });
    setGames(x);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>Matcher</Text>
        <TouchableOpacity onPress={test}>
          <Entypo name="location-pin" size={32} color="#0891B2" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.botWrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {games.map((game) => {
          return (
            <GamesComponent
              key={game.id}
              game={game}
              hometeam={game.hometeam}
              id={game.id}
              opponent={game.opponent}
              day={game.day}
              time={game.time}
              location={game.location}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserHomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topWrapper: {
    flex: 0.15,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "lightgrey",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: "40px",
    paddingBottom: 15,
    fontWeight: "700",
  },

  botWrapper: {
    flex: 1,
  },
});
