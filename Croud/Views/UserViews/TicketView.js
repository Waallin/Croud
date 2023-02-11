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

const TicketView = ({ route }) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;

  const [adultTickets, setAdultTickets] = useState();
  const [kidTickets, setKidTickets] = useState();

  const [totalPrice, setTotalPrice] = useState(
    adultTickets * gameInfo.adultTicket
  );


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
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Text>
          {gameInfo.hometeam} - {gameInfo.opponent}
        </Text>
        <Text>{gameInfo.day}</Text>
        <Text>{gameInfo.time}</Text>
        <Text>{gameInfo.location}</Text>
      </View>
      <View style={styles.midWrapper}>
        <Text>{gameInfo.text}</Text>
        <View style={styles.ticketWrapper}>
          <Text>Vuxen: ({gameInfo.adultTicket})</Text>
          <TextInput
            style={styles.input}
            numeric
            keyboardType={"numeric"}
            onChangeText={(adultTickets) => setAdultTickets(adultTickets)}
            value={adultTickets}
            defaultValue="0"
          />
        </View>
        <View style={styles.ticketWrapper}>
          <Text>Barn/pensionär: ({gameInfo.kidTicket})</Text>
          <TextInput
            style={styles.input}
            numeric
            keyboardType={"numeric"}
            onChangeText={(kidTickets) => setKidTickets(kidTickets)}
            value={kidTickets}
            defaultValue="0"
          />
        </View>
      </View>
      <Text>att betala: {totalTicketPrice()}</Text>
      <View style={styles.botWrapper}>
          <TouchableOpacity style={styles.buybtn} onPress={buyTicket}>
            <Text>Köp</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TicketView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  topWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  botWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  midWrapper: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: 80,
    borderBottomWidth: 0.5,
    textAlign: "center",
    height: 40,
  },

  ticketWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buybtn: {
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 5,
    width: 150,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgreen",
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
