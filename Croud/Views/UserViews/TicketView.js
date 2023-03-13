import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../../Firebase/firebase";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../Styles/global";
import { Ionicons } from "@expo/vector-icons";

const TicketView = ({ route }) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;

  
  const [adultTickets, setAdultTickets] = useState();
  const [kidTickets, setKidTickets] = useState();
  const [totalPrice, setTotalPrice] = useState(
    adultTickets * gameInfo.adultTicket
  );
  function navigateBack() {
    navigate.goBack();
  }

/*
  function totalTicketPrice() {
    const adult = adultTickets * gameInfo.adultTicket;
    const kid = kidTickets * gameInfo.kidTicket;
    const sum = adult + kid;
    if (sum) {
      return sum;
    } else if (adult) {
      return adult;
    } else if (kid) {
      return kid;
    } else {
      return 0;
    }
  }
  async function buyTicket() {
    const uuid = uuidv4();
    await setDoc(doc(database, "Tickets", uuid), {
      GameId: route.params.game.id,
      Hometeam: route.params.game.hometeam,
      Opponent: route.params.game.opponent,
      Location: route.params.game.location,
      Time: route.params.game.time,
      AdultTickets: adultTickets,
      KidTickets: kidTickets,
      TotalPrice: totalTicketPrice(),
      Scanned: false,
      //Sport: route.params.game.id,
    });

    navigate.navigate("QrCodeView", {
      uuid: uuid,
    });
  } */
  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
      <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="left" size={20} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.teamsWrapper}>
      <View style={styles.homeTeam}>
        <Text style={globalStyles.smallerTitle}>{gameInfo.hometeam}</Text>
      </View>
      <View style={styles.timeWrapper}>
        <Text style={globalStyles.primaryTitle}>{gameInfo.time}</Text>
        <Text>{gameInfo.day}</Text>
        </View>
      <View style={styles.opponentTeam}> 
        <Text style={globalStyles.smallerTitle}>{gameInfo.opponent}</Text>
      </View>
      </View>
        <View style={styles.infoText}>
        <Text style={globalStyles.primaryText}>
          {gameInfo.text}
        </Text>
        </View>
    </SafeAreaView>
  );
};

export default TicketView;

const styles = StyleSheet.create({
  midWrapper: {
    flex: 1,
  },

  teamsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20
  },

  homeTeam: {
    width: "30%",
    alignItems: "flex-start"
  },

  opponentTeam: {
    width: "30%",

alignItems: "flex-end",    
  },
  
  timeWrapper: {

    width: "36%",
    alignItems: "center"
  },

  infoText: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
    padding: 20
  },


});

/* 
      import QRCode from 'react-native-qrcode-svg';
      <QRCode
      value={route.params.id}
      size={100}
      color='black'
      backgroundColor='lightblue'
      />

*/
