import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { database } from "../../Firebase/firebase";
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
const UserHomeView = ({ route }) => {
  useEffect(() => {
    getGames();
  }, [database]);
  const [games, setGames] = useState([]);

  //Update db when scroll down
  const [refreshing, setRefreshing] = React.useState(false);

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
    });
    /*
    let dateFilter = games.sort(function (a, b) {
        return new Date(a.day) - new Date(b.day);
      });
      setGames(dateFilter);    
      */
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>Matcher</Text>
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
    paddingLeft: 20,
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
