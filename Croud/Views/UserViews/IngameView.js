import { useNavigation } from "@react-navigation/native";
import { arrayUnion, doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import 'react-native-get-random-values';
import QRCode from "react-native-qrcode-svg";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../Firebase/firebase";
import { globalStyles } from "../../Styles/global";
const IngameView = ({ route }) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;
  const newTicket = route.params.newTicket;

  const [scanned, setScanned] = useState(false);

  const [ticketId, setTicketId] = useState(null);
  const uuid = uuidv4();

  useEffect(() => {
    if (newTicket) {
      addTicketToUser();
      addUserToGame();
      createQrTicket();
    } else {
      setQrCode()
    }
  }, []);

  function setQrCode() {

    let gameId = gameInfo.id;
    
    let allTickets = userInfo.Tickets;

    let filtered = allTickets.filter(obj => obj.gameId === gameId);
    setTicketId(filtered[0].ticketId);

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
      lot: false
    };

    ticketsArray.push(newTicket);

    await setDoc(ref, { Tickets: ticketsArray }, { merge: true });
  }

  async function addUserToGame() {
    const ref = doc(database, "Games", gameInfo.id);
    await updateDoc(ref, {
      Participants: arrayUnion(userInfo.Email),
    });
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
  }

  async function buyLot() {
    const ref = doc(database, "Games", gameInfo.id);
    await updateDoc(ref, {
      Lots: arrayUnion(userInfo.Email),
    });
  }

  useEffect(() => {

    if (ticketId) {
    const scanned = onSnapshot(doc(database, "Tickets", ticketId), (doc) => {
      if (doc.data().Scanned == true) {
        setScanned(true);
        console.log("weeheeeey");
      }
    });
  }
  }, [ticketId]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.qrContainer} onPress={(() => {console.log(ticketId)})}>
        {ticketId ? <QRCode value={ticketId} size={200} backgroundColor={scanned ? globalStyles.primaryGreen : "white"} color="black" /> : null}
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={buyLot}>
        <Text style={globalStyles.primaryBtnText}>Köp lott</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.secondaryGreyBtn} onPress={navigate.goBack}>
        <Text style={globalStyles.secondaryBtnText}>Tillbaka</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default IngameView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  qrContainer: {

    padding: 30,
    
  },
});
