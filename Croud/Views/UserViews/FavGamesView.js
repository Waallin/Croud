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
import NearbyGamesView from "./NearbyGamesView";


const FavGamesView = (route) => {
    const [games, setGames] = useState([]);
    const [FavouriteGames, setFavouriteGames] = useState([]);
    const [nearbyGames, setNearbyGames] = useState([]);
    const [nearby, setNearby] = useState(false);
    const [nearbyTeams, setNearbyTeams] = useState([]);
    const [location, setLocation] = useState();
  
    const Tab = createMaterialTopTabNavigator();
  
    useEffect(() => {
      getGames();
    }, [database]);
  
  
    //Update db when scroll down
    const [refreshing, setRefreshing] = React.useState(false);

    async function getGames() {
      setGames([]);
      let favs = "";
      const docRef = doc(database, "Users", route.userData.userData.Email);
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
      let x = [];
      const q = query(
        collection(database, "Games"),
        where("Hometeam", "==", team)
      );
      const querySnapshot = await getDocs(q);
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
        setGames((oldGames) => [...oldGames, obj]);

      }
      );
      let dateFilter = games.sort(function (a, b) {
          return new Date(a.day) - new Date(b.day);
        });
    }
  return (
    <View style={styles.container}> 
      <ScrollView
        style={styles.gamesContainer}
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
    </View>
  )
}

export default FavGamesView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"lightgrey",
        marginTop: 3
      },


})