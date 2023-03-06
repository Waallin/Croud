import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect,  useState } from "react";
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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { globalStyles } from "../../Styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
const FavGamesView = (route) => {
  const [games, setGames] = useState([]);
  const [favs, setFavs] = useState(false);
  const [filterGames, setFilterGame] = useState([]);
  const currentDate = new Date();
  let today = currentDate.toISOString().split("T")[0];
  const Tab = createMaterialTopTabNavigator();
  const navigate = useNavigation();


useFocusEffect(
  React.useCallback(() => {
    getGames();
  }, [])
);

  //Update db when scroll down
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getGames();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  async function getGames() {
    setGames([]);
    let favs;
    const docRef = doc(database, "Users", route.userData.userData.Email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      favs = docSnap.data().Favourites;
      favs.length > 0 ? setFavs(true) : setFavs(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    //sorterar bort gamla matcher och sorterar in allt i datumordning. mvh ChatGPT
    const allGames = await Promise.all(favs.map(data));
    const games = allGames.flat();
    games.sort((a, b) => new Date(a.day) - new Date(b.day));
    setGames(games);
  }

  async function data(team) {
    let x = [];
    const q = query(
      collection(database, "Games"),
      where("Hometeam", "==", team)
    );
    const querySnapshot = await getDocs(q);

    const games = [];
    querySnapshot.forEach((doc) => {
      let obj = {
        id: doc.id,
        hometeam: doc.data().Hometeam,
        text: doc.data().Text,
        adultTicket: doc.data().AdultTicket,
        kidTicket: doc.data().KidTicket,
        active: doc.data().Active,
        opponent: doc.data().Opponent,
        time: doc.data().Time,
        day: doc.data().Day,
        location: doc.data().Location,
        sport: doc.data().sport,
      };
      obj.day >= today ? x.push(obj) : null;
      games.push(obj);
    });
    return x;
  }
  return (
    <>
    {favs ? 
        <View style={globalStyles.primaryContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {games.map((game) => {
            return (
              <GamesComponent
                key={game.id}
                game={game}
                active={game.active}
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
      </View> :
      <View style={styles.container}>
                      <Ionicons
                name="heart-outline"
                size={52}
                color={globalStyles.primaryGreen}
              />
              <View style={styles.textWrapper}>
                <Text style={globalStyles.bigDarkText}>Inga favoritlag tillagda</Text>
                <Text style={globalStyles.primaryText}>Sök efter ditt favoritlag via knappen nedan.</Text>
              </View>
              <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={(() => navigate.navigate("Sök förening"))}>
                <Text style={globalStyles.primaryBtnText}>Sök förening</Text>
              </TouchableOpacity>
        </View>}
    </>
  );
};

export default FavGamesView;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  textWrapper: {
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 10
  }
});
