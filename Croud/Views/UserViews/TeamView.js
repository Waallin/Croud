import { StyleSheet, Text, View } from "react-native";
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
  getDoc,
} from "firebase/firestore";
import GamesComponent from "./UserComponents/GamesComponent";

const TeamView = ({ route }) => {
  const [games, setGames] = useState([]);

  //check if team is in favourites or not
  const [favOrNot, setFavOrNot] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    updateUser();
    getGames(userInfo);
  }, [route.params]);

  async function updateUser() {
    const docRef = doc(
      database,
      "Users",
      route.params.userData.userData.Username
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
      if (
        docSnap.data() &&
        docSnap.data().Favourites.includes(route.params.org.Name)
      ) {
        setFavOrNot(true);
      } else {
        setFavOrNot(false);
      }
    }
  }

  async function getGames() {
    const q = query(
      collection(database, "Games"),
      where("Hometeam", "==", route.params.org.Name)
    );
    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      let obj = {
        id: doc.id,
        opponent: doc.data().Opponent,
        time: doc.data().Time,
        day: doc.data().Day,
        location: doc.data().Location,
      };
      x.push(obj);
    });
    //filter on dates
    let dateFilter = x.sort(function (a, b) {
      return new Date(a.day) - new Date(b.day);
    });

    setGames(dateFilter);
  }

  //add to favourite or remove if we click again
  async function addOrg() {
    if (userInfo != null && userInfo.Favourites.includes("Håsta IBK")) {
    }
    if (favOrNot == false) {
      const ref = doc(database, "Users", "Lars");
      await updateDoc(ref, {
        Favourites: arrayUnion(route.params.org.Name),
      });
      setFavOrNot(true);
    } else {
      const ref = doc(database, "Users", "Lars");
      await updateDoc(ref, {
        Favourites: arrayRemove(route.params.org.Name),
      });
      setFavOrNot(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>{route.params.org.Name}</Text>
        <TouchableOpacity style={styles.h} onPress={addOrg}>
          <AntDesign
            name={favOrNot ? "heart" : "hearto"}
            size={32}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.cominggamestext}>Kommande matcher</Text>
      </View>
      <ScrollView style={styles.botWrapper}>
        {games.map((game) => {
          return (
            <GamesComponent
              key={game.id}
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

export default TeamView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topWrapper: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
  },

  cominggamestext: {
    width: "100%",
    textAlign: "center",
    fontSize: "23px",
    fontWeight: "600",
  },
});
