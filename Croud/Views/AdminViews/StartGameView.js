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
    console.log("här")
    const ref = doc(database, "Games", eventInfo.key);
    await updateDoc(ref, {
      Active: true,
      Text: textInput ? textInput : "",
      //AdultTicket: parseInt(adultTicket),
      //KidTicket: parseInt(kidTicket)
    });
    if (isEnabled) {
      //send notifications to organisations fans
    }
    navigate.navigate("ActiveGame", {
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
        <View style={styles.gameInfoWrapper}>
          <Text style={globalStyles.primaryTitle}>{eventInfo.Hometeam}</Text>
          <Text style={globalStyles.primaryTitle}>{eventInfo.Opponent}</Text>
          <Text style={globalStyles.primaryTitle}>{eventInfo.Time}</Text>
          <Text style={globalStyles.primaryGrey}>{eventInfo.Day}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={globalStyles.primaryTitle}>Starta evenemang</Text>
          <Text style={globalStyles.primaryText}>
            Lorem ipsum dolor sit amet consectetur. Eu diam gravida eu
            adipiscing nulla in.
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={globalStyles.primaryInput}>
            <AntDesign
              name="user"
              size={20}
              style={globalStyles.primaryInputIcon}
            />
            <TextInput
              style={globalStyles.primaryTextInput}
              placeholder={"Skriv en text om matchen"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(text) => setTextInput(text)}
              value={textInput}
            />
          </View>
        </View>
      </View>
      <View style={styles.botWrapper}>
        <TouchableOpacity style={globalStyles.primaryGreenBtn}  onPress={startEvent}>
          <Text style={globalStyles.primaryBtnText}>
            Starta evenemang
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.secondaryGreyBtn}>
          <Text style={globalStyles.secondaryBtnText}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StartGameView;

const styles = StyleSheet.create({
  midWrapper: {
    flex: 5,
  },

  gameInfoWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },

  inputWrapper: {
    marginTop: 60,
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  botWrapper: {
    flex: 2,
    alignItems: "center",
  },
});
