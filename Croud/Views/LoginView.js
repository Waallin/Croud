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

const LoginView = () => {
  const [username, setUsername] = useState();
  const navigate = useNavigation();

  function login() {
    console.log(database);
    setUsername("");

    if (username == "Admin") {
        navigate.navigate("HomeAdmin")
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
        <TextInput placeholder={"Password"} style={styles.input} />
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
    alignItems: "center"
  }
});
