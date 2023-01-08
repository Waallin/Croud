import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { database } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const LoginView = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigation();

  async function login() {
    setUsername("");
    const docRef = doc(database, "OrgUsers", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      if (password === docSnap.data().Password) {
        navigate.navigate("HomeAdmin");
      }
    } else {
      setPassword("");
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}></View>
      <View style={styles.botWrapper}>
        <TextInput
          placeholder={"UserName"}
          style={styles.input}
          onChangeText={(userName) => setUsername(userName)}
          value={username}
        />
        <TextInput
          placeholder={"Password"}
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <TouchableOpacity style={styles.login} onPress={login}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topWrapper: {
    flex: 2,
  },

  botWrapper: {
    flex: 2,
    alignItems: "center",
  },

  input: {
    width: 250,
    height: 50,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },

  login: {
    width: 250,
    height: 50,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
  },
});
