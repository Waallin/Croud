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
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import "react-native-get-random-values";
import QRCode from "react-native-qrcode-svg";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../Firebase/firebase";
import { globalStyles } from "../../Styles/global";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TicketStatusComponent from "./UserComponents/TicketStatusComponent";
import AppLoading from "expo-app-loading";

const IngameView = ({ route }) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;
  const qrCode = route.params.qrCode;

  const [newGameInfo, setNewGameInfo] = useState();
  const [newUserInfo, setNewUserInfo] = useState();

  const swish = route.params.swish;

  //check if the user has a ticket or not
  const ticket = route.params.ticket;

  const [scanned, setScanned] = useState();
  const [ticketId, setTicketId] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [myLots, setMyLots] = useState(null);
  const [lotWinner, setLotWinner] = useState();
  const [loading, setLoading] = useState(true);
  const [showLotBtn, setShowLotBtn] = useState(false);

  const uuid = uuidv4();

  function navigateBack() {
     navigate.goBack();
  }

  function navigateToSwish() {
    navigate.replace("Swish", {
      game: gameInfo,
      user: userInfo,
      newTicket: false,
    });
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );


  async function getData() {
    const docRef = doc(database, "Games", gameInfo.id);
    const docSnap = await getDoc(docRef);
    let gameId = gameInfo.id;
    setNewGameInfo(docSnap.data());

    const docRef2 = doc(database, "Users", userInfo.Email);
    const docSnap2 = await getDoc(docRef2);
    const data2 = docSnap2.data()
  

    if (data2.Tickets) {
    let allTickets = data2.Tickets;
    let filtered = allTickets.filter((obj) => obj.gameId === gameId);
    
    setTicketId(filtered[0] ? filtered[0].ticketId : null);
    }
  }

  useEffect(() => {
    // prenumerera på förändringar i Firestore-databasen
    const userDocRef = doc(database, "Games", gameInfo.id);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const newUserData = docSnapshot.data();

        const lotWinner = newUserData.LotWinner;

        const allLots = docSnapshot.data().Lots;
        if (allLots) {
          const myLots = allLots.filter((x) => x.email === userInfo.Email);

          if (!myLots.length == 0) {
            const mappedMyLots = myLots.map((x) => x.lotNumber);

            setMyLots(mappedMyLots);
            setLoading(false);
          }

          setLotWinner(lotWinner);
          setLoading(false);
        }
        const maxLots = docSnapshot.data().MaxLots;
        const sellingLots = docSnapshot.data().SellingLots;
        setShowLotBtn(sellingLots);
      }
      setLoading(false);
    });

    // avsluta prenumerationen när komponenten avmonteras
    return () => {
      unsubscribe();
    };
  }, [gameInfo.id]);

  async function buyLot() {
    navigate.navigate("LotView", {
      gameInfo: gameInfo,
      newGameInfo: newGameInfo,
      userInfo: userInfo,
    });
  }

  function showQrCode() {
    setShowQr(!showQr);
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
      <View
        style={{ ...globalStyles.primaryTopWrapper, paddingHorizontal: 15 }}
      >
        <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="left" size={20} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.teamsWrapper, paddingHorizontal: 15 }}>
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
                <QRCode value={ticketId} size={100} color="black" />

                <TicketStatusComponent
                  text={scanned ? "INPASSERAD" : "EJ INPASSERAD"}
                  bg={scanned ? globalStyles.primaryGreen : "#78909C"}
                />
              </View>
            ) : null}
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                {lotWinner ? (
                  <View>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          ...globalStyles.primaryTitle,
                          fontSize: "18px",
                        }}
                      >
                        Dina lotter
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 30,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="ticket-confirmation"
                        size={24}
                        color={globalStyles.primaryGreen}
                      />
                      <Text
                        style={{ ...globalStyles.primaryText, paddingLeft: 10 }}
                      >
                        Lottvinnare: #{lotWinner[0].lotNumber}{" "}
                        {lotWinner[0].name}
                      </Text>
                    </View>
                    {myLots ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="ticket-confirmation"
                          size={24}
                          color={globalStyles.primaryGreen}
                        />
                        <Text
                          style={{
                            ...globalStyles.primaryText,
                            paddingLeft: 10,
                          }}
                        >
                          Mina lotter:{" "}
                        </Text>
                        <Text style={globalStyles.primaryText}>
                          {myLots
                            ? myLots.map((x) => {
                                return <Text key={x}>#{x} </Text>;
                              })
                            : null}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <>
                    {showLotBtn ? (
                      <TouchableOpacity
                        style={globalStyles.primaryGreenBtn}
                        onPress={buyLot}
                      >
                        <Text style={globalStyles.primaryBtnText}>
                          köp lott
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    {myLots ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 30,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="ticket-confirmation"
                          size={24}
                          color={globalStyles.primaryGreen}
                        />
                        <Text
                          style={{
                            ...globalStyles.primaryText,
                            paddingLeft: 10,
                          }}
                        >
                          Mina lotter:{" "}
                        </Text>
                        <Text style={globalStyles.primaryText}>
                          {myLots
                            ? myLots.map((x) => {
                                return <Text key={x}>#{x} </Text>;
                              })
                            : null}
                        </Text>
                      </View>
                    ) : null}
                  </>
                )}
              </>
            )}
          </View>
        ) : (
          <View style={styles.noTicketWrapper}>
            <View style={styles.textWrapper}>
              <MaterialCommunityIcons
                name="ticket-outline"
                size={52}
                color={globalStyles.primaryGrey}
              />
              <Text style={{ ...globalStyles.primaryTitle, fontSize: "17px" }}>
                Ingen biljett köpt än
              </Text>
              <Text style={globalStyles.darkerText}>
                Köp din biljett via knappen nedan
              </Text>
            </View>
            <TouchableOpacity
              style={{ ...globalStyles.primaryGreenBtn, marginTop: 20 }}
              onPress={navigateToSwish}
            >
              <Text style={globalStyles.primaryBtnText}>Köp biljett</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default IngameView;

const styles = StyleSheet.create({
  ticketWrapper: {
    flex: 1,
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
    justifyContent: "space-around",
  },

  qrWrapper: {
    alignItems: "center",
    height: "35%",
    justifyContent: "space-around",
    marginBottom: 30,
  },
});
