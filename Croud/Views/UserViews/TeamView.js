import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { database } from "../../Firebase/firebase";
import {
  doc,
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
import { globalStyles } from "../../Styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const TeamView = ({ route }) => {
  
  const [games, setGames] = useState([]);

  const currentDate = new Date();
  let today = currentDate.toISOString().split("T")[0];
  //check if team is in favourites or not
  const [favOrNot, setFavOrNot] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const navigate = useNavigation();

  const userData = route.params.userData;
  const org = route.params.org;
  useEffect(() => {
    updateUser();
    getGames(userInfo);
  }, [route.params]);

  async function updateUser() {
    const docRef = doc(database, "Users", userData.Email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
      if (docSnap.data() && docSnap.data().Favourites.includes(org)) {
        setFavOrNot(true);
      } else {
        setFavOrNot(false);
      }
    }
  }

  async function getGames() {
    const q = query(
      collection(database, "Games"),
      where("Hometeam", "==", org)
    );
    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      let obj = {
        id: doc.id,
        active: doc.data().Active,
        hometeam: doc.data().Hometeam,
        text: doc.data().Text,
        lots: doc.data().Lots,
        maxLots: doc.data().MaxLots,
        opponent: doc.data().Opponent,
        time: doc.data().Time,
        day: doc.data().Day,
        location: doc.data().Location,
      };
      obj.day >= today ? x.push(obj) : null;
    });
    //filter on dates
    let dateFilter = x.sort(function (a, b) {
      return new Date(a.day) - new Date(b.day);
    });
    setGames(dateFilter);
  }

  function navigateBack() {
    navigate.goBack();
  }

  //add to favourite or remove if we click again
  async function addOrg() {
    if (favOrNot == false) {
      const ref = doc(database, "Users", userData.Email);
      await updateDoc(ref, {
        Favourites: arrayUnion(org),
      });

      const ref2 = doc(database, "Organisations", org);
      await updateDoc(ref2, {
        Fans: arrayUnion(userData.Email),
      });
      setFavOrNot(true);

    } else {
      const ref = doc(database, "Users", userData.Email);
      await updateDoc(ref, {
        Favourites: arrayRemove(org),
      });
      const ref2 = doc(database, "Organisations", org);
      await updateDoc(ref2, {
        Fans: arrayRemove(userData.Email),
      });
      setFavOrNot(false);
    }
  }
  
  function test() {
    console.log(route.params.userData)
  }

  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="left" size={20} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
        <Text style={globalStyles.primaryTitle}>{org}</Text>
        <TouchableOpacity onPress={addOrg}>
          <Ionicons
            name={favOrNot ? "heart" : "heart-outline"}
            size={32}
            color={globalStyles.primaryGreen}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.botWrapper}>
          {games.map((game) => {
            return (
              <GamesComponent
                key={game.id}
                user={userData}
                game={game}
                active={game.active}
                hometeam={game.hometeam}
                maxLots={game.maxLots}
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

export default TeamView;

const styles = StyleSheet.create({});
