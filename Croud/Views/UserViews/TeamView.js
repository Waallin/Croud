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
  arrayRemove
} from "firebase/firestore";
import GamesComponent from "./UserComponents/GamesComponent";

const TeamView = ({ route }) => {
  const [games, setGames] = useState([]);

  //check if team is in favourites or not
  const [favOrNot, setFavOrNot] = useState(false);

  useEffect(() => {
    getGames();
    checkFavOrNot();
  }, [route.params]);

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
  function checkFavOrNot() {
    if (
      route.params.userData.userData.Favourites.includes(route.params.org.Name)
    ) {
      setFavOrNot(true);
    } else {
      setFavOrNot(false);
    }
  }
  //add to favourite or remove if we click again
  async function addOrg() {
    console.log(favOrNot)

    if (favOrNot == false)
    {
      const washingtonRef = doc(database, "Users", "Lars");
      await updateDoc(washingtonRef, {
        Favourites: arrayUnion(route.params.org.Name),
      });
      setFavOrNot(true); 
    } else {
      const washingtonRef = doc(database, "Users", "Lars");
      await updateDoc(washingtonRef, {
        Favourites: arrayRemove(route.params.org.Name)
    });
      setFavOrNot(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.t}>{route.params.org.Name}</Text>
      <Text style={styles.t}>{route.params.org.Sport}</Text>
      <Text style={styles.t}>{route.params.org.Place}</Text>
      <Text style={styles.t}>{route.params.org.City}</Text>
      <TouchableOpacity style={styles.h} onPress={addOrg}>
        <AntDesign
          name={favOrNot ? "heart" : "hearto"}
          size={70}
          color="lightgreen"
        />
      </TouchableOpacity>
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
    alignItems: "center",
    backgroundColor: "#0891B2",
  },

  t: {
    fontSize: "32px",
    fontWeight: "600",
    padding: 5,
  },

  h: {
    marginTop: 20,
  },

  botWrapper: {
    marginTop: 20,
    width: "100%",
    flex: 1,
    height: "100%",
  },
});
