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
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../Styles/global";
import { AntDesign } from "@expo/vector-icons";
const StartGameView = (event) => {
  const eventInfo = event.route.params.event;
  const [textInput, setTextInput] = useState();
  const [adultTicket, setAdultTicket] = useState();
  const [kidTicket, setKidTicket] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigate = useNavigation();

  async function startEvent() {
    const ref = doc(database, "Games", eventInfo.key);
    await updateDoc(ref, {
      Active: true,
      SellingLots: false, 
      Text: textInput ? textInput : "",
      //AdultTicket: parseInt(adultTicket),
      //KidTicket: parseInt(kidTicket)
    });
    if (isEnabled) {
      //send notifications to organisations fans
    }
    navigate.replace("ActiveGame", {
      event: eventInfo,
    });
  }

  function navigateBack() {
    navigate.goBack();
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
          </View>
          <View style={styles.opponentTeam}>
            <Text style={globalStyles.smallerTitle}>{eventInfo.Opponent}</Text>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <View style={globalStyles.primaryBigInput}>
            <TextInput
              style={{padding: 15}}
              placeholder={"Skriv en text om matchen"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(text) => setTextInput(text)}
              value={textInput}
            />
          </View>
        </View>
      </View>
      <View style={styles.botWrapper}>
        <TouchableOpacity
          style={globalStyles.primaryGreenBtn}
          onPress={startEvent}
        >
          <Text style={globalStyles.primaryBtnText}>Starta evenemang</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.secondaryGreyBtn} onPress={navigateBack}>
          <Text style={globalStyles.secondaryBtnText}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StartGameView;

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
});
