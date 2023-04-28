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
import {SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import "react-native-get-random-values";
import QRCode from "react-native-qrcode-svg";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../Firebase/firebase";
import { globalStyles } from "../../Styles/global";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import TicketStatusComponent from "./UserComponents/TicketStatusComponent";

const IngameView = ({ route }) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;
  const qrCode = route.params.qrCode;

  const [newGameInfo, setNewGameInfo] = useState()

  const swish = route.params.swish;

  //check if the user has a ticket or not
  const ticket = route.params.ticket;

  const [scanned, setScanned] = useState();
  const [ticketId, setTicketId] = useState(null);

  const [showQr, setShowQr] = useState(false);

  const [allLots, setAllLots] = useState(null);
  const [myLots, setMyLots] = useState(null);

  const [lotWinner, setLotWinner] = useState();


  const uuid = uuidv4();

  function navigateBack() {
    navigate.goBack();
  }

  useEffect(() => {
  }, []);

  function navigateToSwish() {
    navigate.replace("Swish", {
      game: gameInfo,
      user: userInfo,
      newTicket: false,
    });
  }

  useFocusEffect(
    useCallback(() => {
      getData()
      if (route.params.ticket) {
        setQrCode();
      }
    }, [])
  );

  async function getData() {
    const docRef = doc(database, "Games", gameInfo.id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
  }


  function setQrCode() {
    if (qrCode) {
      setTicketId(qrCode)
    } else 
    {
    let gameId = gameInfo.id;

    let allTickets = userInfo.Tickets;
    let filtered = allTickets.filter((obj) => obj.gameId === gameId);
    setTicketId(filtered[0].ticketId);
    }
  }

  async function getData() {
    const docRef = doc(database, "Games", gameInfo.id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());

    setNewGameInfo(docSnap.data());
  }

  useEffect(() => {
    // prenumerera på förändringar i Firestore-databasen
    const userDocRef = doc(database, "Games", gameInfo.id);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const newUserData = docSnapshot.data();
        const lotWinner = newUserData.LotWinner;
        console.log(lotWinner)
        setLotWinner(lotWinner)
      }
    });

    // avsluta prenumerationen när komponenten avmonteras
    return () => {
      unsubscribe();
    };
  }, [gameInfo.id]);
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
  }

  async function addUserToGame() {
    const ref = doc(database, "Games", gameInfo.id);
    await updateDoc(ref, {
      Tickets: arrayUnion(userInfo.Email),
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
    navigate.navigate("LotView", {
      gameInfo: gameInfo,
      newGameInfo: newGameInfo,
      userInfo: userInfo,
    });
  }

  function showQrCode() {
    setShowQr(!showQr);
    console.log(showQr)
  }
  useEffect(() => {
    if (ticketId) {
      const scanned = onSnapshot(doc(database, "Tickets", ticketId), (doc) => {
        if (doc.data().Scanned == true) {
          setScanned(true);
        }
      });
    }
  }, [ticketId]);

  return (
    
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={{...globalStyles.primaryTopWrapper, paddingHorizontal: 15}}>
        <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="left" size={20} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={{...styles.teamsWrapper, paddingHorizontal: 15}}>
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
        <Text style={globalStyles.primaryText}>{gameInfo.text}</Text>

        {route.params.ticket ? (
          <View style={styles.ticketWrapper}>
            {ticketId ? (
              <View style={styles.qrWrapper}>
                <Text style={globalStyles.darkerText}>Din biljett</Text>
              <QRCode
                value={ticketId}
                size={100}
                color="black"
              />
              
              <TicketStatusComponent text={scanned ? "INPASSERAD" : "EJ INPASSERAD"} bg={scanned ? globalStyles.primaryGreen : "#78909C"} />
              </View> 
            ) : null}
            <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={buyLot} disabled={lotWinner ? true : false}>
              <Text style={globalStyles.primaryBtnText}>köp lott</Text>
            </TouchableOpacity>
            {lotWinner ? <Text style={{...globalStyles.primaryText, marginTop: 30}}>Lott-vinnare: {lotWinner[0].name} med nr {lotWinner[0].lotNumber}</Text> : null}
          </View>
          
        ) : (
          <View style={styles.noTicketWrapper}>
            <View style={styles.textWrapper}>
            <MaterialCommunityIcons name="ticket-outline" size={52} color={globalStyles.primaryGrey} />
            <Text style={{...globalStyles.primaryTitle, fontSize: "17px"}}>Ingen biljett köpt än</Text>
            <Text style={globalStyles.darkerText}>Köp din biljett via knappen nedan</Text>
            </View>
            <TouchableOpacity
              style={{...globalStyles.primaryGreenBtn, marginTop: 20}}
              onPress={navigateToSwish}
            >
              <Text style={globalStyles.primaryBtnText}>Köp biljett</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {showQr ? 
      <View style={styles.showQrContainer}>
        <TouchableOpacity onPress={showQrCode}>
        <QRCode
                value={ticketId}
                size={200}
                color="black"
              />
        </TouchableOpacity>
      </View> : null}
    </SafeAreaView>

  );
};

export default IngameView;

const styles = StyleSheet.create({




  ticketWrapper: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },



  teamsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },

  homeTeam: {
    width: "30%",
    alignItems: "flex-start",
  },

  opponentTeam: {
    width: "30%",
    alignItems: "flex-end",
  },

  timeWrapper: {
    width: "36%",
    alignItems: "center",
  },

  infoText: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
    padding: 20,
  },


  textWrapper: {
    marginTop: 100,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around"
  },

  qrWrapper: {

    alignItems: "center",
    height: "35%",
    justifyContent: "space-around",
    marginBottom: 30,
  }
});
