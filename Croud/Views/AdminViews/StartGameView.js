import { StyleSheet, Text, View, Switch, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { database } from "../../Firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
const StartGameView = (event) => {
  const eventInfo = event.route.params.event;
  const [textInput, setTextInput] = useState();
  const [adultTicket, setAdultTicket] = useState();
  const [kidTicket, setKidTicket] = useState();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigate = useNavigation();
  async function startEvent() {
    console.log(eventInfo)
    const ref = doc(database, "Games", eventInfo.key);
      await updateDoc(ref, {
        Active: true,
        Text: (textInput ? textInput : ""),
        AdultTicket: parseInt(adultTicket),
        KidTicket: parseInt(kidTicket)

      });
    if (isEnabled) {
      //send notifications to organisations fans
    }
    navigate.navigate("ActiveGame", {
      event: eventInfo
   });
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
        <View style={styles.topWrapper}>
          <Text style={styles.team}>{eventInfo.Hometeam}</Text>
          <View style={styles.timeWrapper}>
            <Text style={styles.time}>{eventInfo.Time}</Text>
            <Text style={styles.day}>{eventInfo.Day}</Text>
          </View>
          <Text style={styles.team}>{eventInfo.Opponent}</Text>
        </View>
        <View style={styles.midWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Exempelvis: Derbydags!!"
            onChangeText={(textInput) => setTextInput(textInput)}
            value={textInput}
          />
          <View style={styles.tickets}>
            <Text style={styles.ticketTitle}>Biljetterpriser</Text>
            <View style={styles.adults}>
              <Text style={styles.ticketText}>Vuxen</Text>
              <TextInput
                numeric
                keyboardType={"numeric"}
                style={styles.ticketInput}
                onChangeText={(adultTicket) => setAdultTicket(adultTicket)}
                value={adultTicket}
              />
            </View>
            <View style={styles.adults}>
              <Text style={styles.ticketText}>Pensionär/barn</Text>
              <TextInput
                numeric
                keyboardType={"numeric"}
                style={styles.ticketInput}
                onChangeText={(kidTicket) => setKidTicket(kidTicket)}
                value={kidTicket}
              />
            </View>
            <View style={styles.notificationWrapper}>
              <Text style={styles.notificationText}>Skicka notis</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
        <View style={styles.botWrapper}>
          <TouchableOpacity style={styles.startBtn} onPress={startEvent}>
            <Text style={styles.startBtnText}>Starta match</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default StartGameView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },

  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  midWrapper: {
    flex: 5,
    alignItems: "center",
  },

  botWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: 250,
    borderBottomWidth: 0.5,
    height: 40,
    padding: 5,
  },

  tickets: {
    width: 250,
    marginTop: 20,
  },

  ticketTitle: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  adults: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  ticketText: {
    fontSize: "18px",
  },

  ticketInput: {
    width: 80,
    borderBottomWidth: 0.5,
    textAlign: "center",
    height: 40,
  },
  notificationWrapper: {
    marginTop: 40,
    alignItems: "center",
    width: 200,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  notificationText: {
    fontSize: "18px",
  },
  startBtn: {
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
  },

  startBtnText: {
    fontWeight: "600",
    fontSize: "18px",
  },

  team: {
    fontSize: "15px",
    fontWeight: "600",
    paddingHorizontal: 50,
  },

  timeWrapper: {
    alignItems: "center",
  },

  time: {
    fontSize: "24px",
    fontWeight: "700",
  },

  day: {
    fontSize: 10,
    marginTop: 10,
    color: "rgba(1,1,1, 0.7)",
  },
});
