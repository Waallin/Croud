import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { doc, setDoc } from "firebase/firestore"; 
import { database } from "../../Firebase/firebase";

const CreateEventView = (props) => {
  const [opponent, setOpponent] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  
  async function test() {
    const uuid = uuidv4();
    await setDoc(doc(database, "Games", uuid), {
      orgName: props.orgData.OrgName,
      opponent: opponent,
      day: day,
      time: time
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.input}>{props.orgData.OrgName}</Text>
      <Text style={styles.input}>VS</Text>
      <TextInput
        placeholder={"Bortalag"}
        style={styles.input}
        onChangeText={(opponent) => setOpponent(opponent)}
        value={opponent}
      />
      <TextInput
        placeholder={"Dag"}
        style={styles.input}
        onChangeText={(day) => setDay(day)}
        value={day}
      />
      <TextInput
        placeholder={"Tid"}
        style={styles.input}
        onChangeText={(time) => setTime(time)}
        value={time}
      />
      <TouchableOpacity onPress={test}>
        <Text style={styles.input}>Starta evenemang</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEventView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 250,
    height: 50,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
  },
});
