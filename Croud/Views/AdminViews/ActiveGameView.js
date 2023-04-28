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
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
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
import { useEffect } from "react";
const ActiveGameView = (event) => {
  const [gameInfo, setGameInfo] = useState([]);
  const navigate = useNavigation();
  const eventInfo = event.route.params.event;
  const [tickets, setTickets] = useState()

  function navigateBack() {
    navigate.goBack();
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const docRef = doc(database, "Games", eventInfo.key);
    const docSnap = await getDoc(docRef);

    setGameInfo(docSnap.data());
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
          <View style={{flexDirection: "row", alignItems: "center"}}>
          <MaterialCommunityIcons name="ticket-outline" size={24} color="black" />
                <Text style={{...globalStyles.primaryText, paddingLeft: 10}}>{gameInfo.Tickets ? gameInfo.Tickets.length : 0} sålda biljetter </Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                <MaterialCommunityIcons name="ticket" size={24} color={globalStyles.primaryGreen} />
                <Text style={{...globalStyles.primaryText, paddingLeft: 10}}>{gameInfo.CheckedIn ? gameInfo.CheckedIn.length : 0} inpasserade</Text>
                </View>
              </View>
      </View>
      <View style={styles.botWrapper}>
        <TouchableOpacity style={globalStyles.secondaryGreyBtn}>
          <Text style={globalStyles.secondaryBtnText}>Avsluta evenemang</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.secondaryGreyBtn} onPress={navigateBack}>
          <Text style={globalStyles.secondaryBtnText}>Avbryt</Text>
        </TouchableOpacity>
      </View>
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
  },

  gameInfoWrapper: {
    padding: 15
  }
});
