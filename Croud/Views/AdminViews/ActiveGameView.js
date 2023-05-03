import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { database } from "../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../Styles/global";
import { AntDesign } from "@expo/vector-icons";
import ActiveComponent from "../UserViews/UserComponents/ActiveComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
const ActiveGameView = (event) => {
  const [gameInfo, setGameInfo] = useState([]);
  const navigate = useNavigation();
  const [lotWinner, setLotWinner] = useState(null);
  //const eventInfo = event.route.params.event;

  const [eventInfo, setEventInfo] = useState(event.route.params.event);
  const [key, setKey] = useState(event.route.params.event.key);

  const [snapPoints, setSnapPoints] = useState(["65"]);

  const [lotPrice, setLotPrice] = useState(20);
  const [maxLots, setMaxLots] = useState(200);

  let bottomSheetModalRef = useRef(null);
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  function navigateBack() {

    navigate.goBack();
  }

  //close bottomsheetmodal
  function closeModal() {
    bottomSheetModalRef.current?.close();
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    if (eventInfo && eventInfo.key) {
      const docRef = doc(database, "Games", eventInfo.key);
      const docSnap = await getDoc(docRef);

      setGameInfo(docSnap.data());
    }
  }

  async function makeLotWinner() {
    const lots = gameInfo.Lots;
    let random = Math.floor(Math.random() * lots.length);
    const winner = lots[random];
    setLotWinner(winner);

    const ref = doc(database, "Games", key);
    await updateDoc(ref, { LotWinner: arrayUnion(winner) }, { merge: true });
  }

  async function startSellingLots() {
    //function to set the qr-code to true in tickets
    const docRef = doc(database, "Games", key);
    const docSnap = await getDoc(docRef);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      SellingLots: true,
      MaxLots: parseInt(maxLots),
      LotPrice: parseInt(lotPrice),
    });

    closeModal();
  }

  useEffect(() => {
    // prenumerera på förändringar i Firestore-databasen
    const userDocRef = doc(database, "Games", key);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const newGameInfo = docSnapshot.data();

        const newTickets = docSnapshot.data().Tickets;
        console.log(newTickets);
        console.log(newGameInfo);

        setEventInfo(newGameInfo);
      }
    });

    // avsluta prenumerationen när komponenten avmonteras
    return () => {
      unsubscribe();
    };
  }, [gameInfo.id]);

  function setLots() {
    console.log("aps");
  }

  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="left" size={20} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.midWrapper}>
        <View style={styles.teamsWrapper}>
          <View style={styles.homeTeam}>
            <Text style={globalStyles.smallerTitle}>{eventInfo.Hometeam}</Text>
          </View>
          <View style={styles.timeWrapper}>
            <Text style={globalStyles.primaryTitle}>{eventInfo.Time}</Text>
            <Text>{eventInfo.Day}</Text>
            <View style={{ marginTop: 5 }}>
              <ActiveComponent />
            </View>
          </View>
          <View style={styles.opponentTeam}>
            <Text style={globalStyles.smallerTitle}>{eventInfo.Opponent}</Text>
          </View>
        </View>
        <Text style={{ ...globalStyles.primaryText, padding: 15 }}>
          {eventInfo.Text}
        </Text>
        <View style={styles.gameInfoWrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="ticket-confirmation"
              size={24}
              color={globalStyles.primaryGreen}
            />
            <Text style={{ ...globalStyles.primaryText, paddingLeft: 10 }}>
              {gameInfo.Tickets ? gameInfo.Tickets.length : 0} sålda biljetter{" "}
            </Text>
          </View>
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
            <Text style={{ ...globalStyles.primaryText, paddingLeft: 10 }}>
              {gameInfo.CheckedIn ? gameInfo.CheckedIn.length : 0} inpasserade
            </Text>
          </View>
          {eventInfo.SellingLots ? (
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
              <Text style={{ ...globalStyles.primaryText, paddingLeft: 10 }}>
                {gameInfo.Lots ? gameInfo.Lots.length : 0} sålda lotter
              </Text>
            </View>
          ) : null}
          {eventInfo.LotWinner ? (
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
              <Text style={{ ...globalStyles.primaryText, paddingLeft: 10 }}>
                Lottvinnare: #{eventInfo.LotWinner[0].lotNumber}{" "}
                {eventInfo.LotWinner[0].name}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.botWrapper}>
        {eventInfo.SellingLots ? (
          !eventInfo.LotWinner ? (
            <TouchableOpacity
              style={globalStyles.primaryGreenBtn}
              onPress={makeLotWinner}
            >
              <Text style={globalStyles.primaryBtnText}>Dra lottvinnare</Text>
            </TouchableOpacity>
          ) : null
        ) : (
          <TouchableOpacity
            style={globalStyles.primaryGreenBtn}
            onPress={handlePresentModal}
          >
            <Text style={globalStyles.primaryBtnText}>
              Starta lottförsäljning
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={globalStyles.secondaryGreyBtn}>
          <Text style={globalStyles.secondaryBtnText}>Avsluta evenemang</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.secondaryGreyBtn}
          onPress={navigateBack}
        >
          <Text style={globalStyles.secondaryBtnText}>Avbryt</Text>
        </TouchableOpacity>
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 30 }}
        >
          <View style={{ padding: 10, alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ ...globalStyles.primaryTitle, fontSize: "20px" }}>
                Starta lottförsäljning
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 20 }}>
              <View style={{ width: "50%" }}>
                <Text style={{ ...globalStyles.primaryText, marginBottom: 10 }}>
                  Antal lotter
                </Text>
                  <View style={globalStyles.secondaryInput}>
                    <AntDesign
                      name="clockcircleo"
                      size={20}
                      style={globalStyles.primaryInputIcon}
                    />
                    <TextInput
                    placeholder={maxLots.toString()}
                    value={maxLots}
                      setSnapPoints={["50%"]}
                      placeholderTextColor="#60605e"
                      numeric
                      keyboardType={"numeric"}
                      returnKeyType={"done"}
                      style={{width: "80%", height: "100%"}}
                    />
                  </View>
              </View>
              <View style>
                <Text style={{ ...globalStyles.primaryText, marginBottom: 10 }}>
                  Pris per lott
                </Text>
                <TouchableOpacity>
                  <View style={globalStyles.secondaryInput}>
                    <AntDesign
                      name="clockcircleo"
                      size={20}
                      style={globalStyles.primaryInputIcon}
                    />
                    <TextInput
                    placeholder={lotPrice.toString()}
                    value={lotPrice}
                      setSnapPoints={["50%"]}
                      placeholderTextColor="#60605e"
                      onChangeText={(value) => setLotPrice(value)}
                      numeric
                      keyboardType={"numeric"}
                      returnKeyType={"done"}
                      style={{width: "80%", height: "100%"}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={{ ...globalStyles.primaryGreenBtn }}
              onPress={startSellingLots}
            >
              <Text style={globalStyles.primaryBtnText}>Starta</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default ActiveGameView;

const styles = StyleSheet.create({
  midWrapper: {
    flex: 1,
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
    marginTop: 50,
  },

  inputWrapper: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  botWrapper: {
    flex: 2,
    alignItems: "center",
    marginTop: 50,
    justifyContent: "center",
  },

  gameInfoWrapper: {
    padding: 15,
  },
});
