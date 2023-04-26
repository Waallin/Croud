import { useNavigation } from "@react-navigation/native";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import "react-native-get-random-values";
import QRCode from "react-native-qrcode-svg";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../Firebase/firebase";
import { globalStyles } from "../../Styles/global";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from "@expo/vector-icons";

const SwishView = ({ route }) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;

  const uuid = uuidv4();

  function nav() {

    addTicketToUser();
    addUserToGame();
    createQrTicket();
    navigate.replace("ThanksPurchaseView", {
      qrCode: uuid,
      game: gameInfo,
      user: userInfo,
    });
     /*navigate.replace("IngameView", {
      game: gameInfo,
      user: userInfo,
      newTicket: true,
    }); */
  }

  async function addTicketToUser() {
    const ref = doc(database, "Users", userInfo.Email);

    const userSnapshot = await getDoc(ref);
    let ticketsArray = userSnapshot.data().Tickets;

    if (!Array.isArray(ticketsArray)) {
      ticketsArray = [];
    }

    const newTicket = {
      ticketId: uuid,
      gameId: gameInfo.id,
      hometeam: gameInfo.hometeam,
      opponent: gameInfo.opponent,
      time: gameInfo.time,
      day: gameInfo.day,
    };

    ticketsArray.push(newTicket);

    await updateDoc(ref, { Tickets: ticketsArray }, { merge: true });

    console.log("addTicketToUser check")
  }

  async function addUserToGame() {
    const ref = doc(database, "Games", gameInfo.id);
    await updateDoc(ref, {
      Participants: arrayUnion(userInfo.Email),
    });

    console.log("addUserToGame check")
  }

  async function createQrTicket() {
    await setDoc(doc(database, "Tickets", uuid), {
      GameId: gameInfo.id,
      Hometeam: gameInfo.hometeam,
      Opponent: gameInfo.opponent,
      Location: gameInfo.location,
      Time: gameInfo.time,
      Scanned: false,
      //Sport: route.params.game.id,
    });

    console.log("createQrTicket check")
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: globalStyles.primaryGreen,
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      >
        <Feather name="check-circle" size={62} color="white" />
        <Text style={{ fontSize: "32px", color: "white", marginTop: 25 }}>
          Din betalning lyckades!
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#B7B9BA",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          23 Juli 2021 10:22
        </Text>
        <Text
          style={{
            color: "#B7B9BA",
            fontSize: "27px",
            fontWeight: "700",
            marginBottom: 10,
          }}
        >
          Håsta IBK
        </Text>
        <Text
          style={{
            color: "#B7B9BA",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          072 211 82 15
        </Text>
        <Text
          style={{
            color: "#B9B9BA",
            fontSize: "27px",
            fontWeight: "600",
            marginBottom: 50,
          }}
        >
          200 kr
        </Text>
        <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={nav}>
          <Text style={globalStyles.primaryBtnText}>Fortsätt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SwishView;
