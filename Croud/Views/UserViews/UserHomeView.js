import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { database } from "../../Firebase/firebase";
import { Entypo } from "@expo/vector-icons";
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import GamesComponent from "./UserComponents/GamesComponent";
import * as Location from "expo-location";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavGamesView from "./FavGamesView";
import NearbyGamesView from "./NearbyGamesView";

const UserHomeView = ({ route }) => {


  const Tab = createMaterialTopTabNavigator();


  
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
      <Tab.Navigator>
      <Tab.Screen
          options={{
            tabBarActiveBackgroundColor: "#0891B2",
          }}
          name="Favoriter"
          children={() => <FavGamesView route={route} />}
        />
        <Tab.Screen name="Närheten" component={NearbyGamesView} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default UserHomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
