import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../../Firebase/firebase";

const TicketView = ({ route }) => {
  const navigate = useNavigation();

  function testing() {
    console.log(route.params.game);
  }

  async function buyTicket() {
    const uuid = uuidv4();
    await setDoc(doc(database, "Tickets", uuid), {
      GameId: route.params.game.id,
      Hometeam: route.params.game.hometeam,
      Opponent: route.params.game.opponent,
      Location: route.params.game.location,
      Time: route.params.game.time,
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
        <TouchableOpacity onPress={testing}>
          <Text style={styles.title}>Köp biljett</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botWrapper}>
        <View styles={styles.gameInfo}>
          <Text style={styles.teamsText}>
            {route.params.game.hometeam} - {route.params.game.opponent}
          </Text>
          <Text style={styles.timeText}>{route.params.game.time}</Text>
          <Text style={styles.dayText}>{route.params.game.day}</Text>
          <Text style={styles.locationText}>{route.params.game.location}</Text>
        </View>
        <TouchableOpacity onPress={buyTicket}>
          <AntDesign name="qrcode" size={80} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TicketView;

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
    fontSize: "52px",
    fontWeight: "700",
  },

  botWrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },

  teamsText: {
    fontSize: "32px",
    marginTop: 20,
  },
  timeText: {
    fontSize: "32px",
    textAlign: "center",
    marginTop: 20,
  },
  dayText: {
    fontSize: "32px",
    textAlign: "center",
    marginTop: 20,
  },

  locationText: {
    fontSize: "32px",
    textAlign: "center",
    marginTop: 20,
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
