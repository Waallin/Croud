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

const IngameView = ({ route }) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;
  const qrCode = route.params.qrCode;

  //check if the user has a ticket or not
  const ticket = route.params.ticket;

  const [scanned, setScanned] = useState();
  const [ticketId, setTicketId] = useState(null);

  const [showQr, setShowQr] = useState(false);

  const [allLots, setAllLots] = useState(null);
  const [myLots, setMyLots] = useState(null);
  const uuid = uuidv4();

  function navigateBack() {
    navigate.goBack();
  }

  useEffect(() => {
    console.log(route.params);
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
      if (!route.params.ticket) {
        getGame();

      } else {
        setQrCode();
      }
    }, [])
  );

  /*
  useEffect(() => {
     {
      const scanned = onSnapshot(doc(database, "Games", gameInfo.id), (doc) => {
        
        console.log(doc.data)
      });
    }
  }, []); */

  function setQrCode() {
    if (qrCode) {
      setTicketId(qrCode)
      console.log("asd")
    } else 
    {
    let gameId = gameInfo.id;

    let allTickets = userInfo.Tickets;
    let filtered = allTickets.filter((obj) => obj.gameId === gameId);

    setTicketId(filtered[0].ticketId);
    }
  }

  async function getGame() {}
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
    navigate.navigate("LotView", {
      gameInfo: gameInfo,
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
        <TouchableOpacity onPress={showQrCode}>
          <FontAwesome name="qrcode" size={20} color={globalStyles.primaryBlack} />
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
              !scanned ? 
              <QRCode
                value={ticketId}
                size={200}
                color="black"
              /> : 
              <View>
              <AntDesign name="checkcircleo" size={200} color={globalStyles.primaryGreen} />
              </View>
            ) : null}
            <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={buyLot}>
              <Text style={globalStyles.primaryBtnText}>Köp lott</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text>du har ingen biljett</Text>
            <TouchableOpacity
              style={globalStyles.primaryGreenBtn}
              onPress={navigateToSwish}
            >
              <Text style={globalStyles.primaryBtnText}>Köp biljett</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <View>
            <TouchableOpacity
              style={globalStyles.secondaryGreyBtn}
              onPress={navigateBack}
            >
              <Text style={globalStyles.secondaryBtnText}>Tillbaka</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: "space-between",
    marginTop: 20
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

  showQrContainer: {
    flex: 1,
    zIndex: 99,
    position: "absolute",
    backgroundColor: "rgba(1, 1, 1, 0.6)",
    width: "100%",
    height: "110%",
    alignItems: "center",
    justifyContent: "center"
  }

});
