import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalStyles } from '../../Styles/global'
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";import { database } from "../../Firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
const IngameView = ({route}) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;
  const newTicket = route.params.newTicket;

  useEffect(() => {
    if (newTicket) {
    addTicketToUser();
    addUserToGame();
    createQrTicket();
    }
  }, [])

  async function addTicketToUser() {

    const ref = doc(database, "Users", userInfo.Email);
    await updateDoc(ref, {
      Tickets: arrayUnion(gameInfo.id),
    });
  }

  async function addUserToGame() {

    const ref = doc(database, "Games", gameInfo.id);
    await updateDoc(ref, {
      Participants: arrayUnion(userInfo.Email),
    });
  }

  async function createQrTicket() {
    console.log("create")
    const uuid = uuidv4();
    await setDoc(doc(database, "Tickets", uuid), {
      GameId: gameInfo.id,
      Hometeam: gameInfo.hometeam,
      Opponent: gameInfo.opponent,
      Location: gameInfo.location,
      Time: gameInfo.time,
      Scanned: false,
      //Sport: route.params.game.id,
    });
    console.log("ticket")
  } 

 async function buyLot() {
    const ref = doc(database, "Games", gameInfo.id);
    await updateDoc(ref, {
      Lots: arrayUnion(userInfo.Email),
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={buyLot}>
        <Text style={globalStyles.primaryBtnText}>Köp lott</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default IngameView

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})