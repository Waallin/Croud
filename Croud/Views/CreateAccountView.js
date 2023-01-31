import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { database } from "../Firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateAccountView = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const navigate = useNavigation();

  async function createAccount() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setDoc(doc(database, "Users", user.email), {
          Email: user.email,
          UserName: name,
          Favourites: []
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      navigate.replace("login")
  }
  
  function login() {
    navigate.replace("login")
  }

  return (
    <SafeAreaView style={styles.container}>
        <TextInput
          placeholder={"Namn"}
          style={styles.input}
          onChangeText={(name) => setName(name)}
          value={name}
        />
        <TextInput
          placeholder={"Email"}
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          placeholder={"Lösenord"}
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <TextInput
          placeholder={"Lösenord"}
          style={styles.input}
          onChangeText={(rePassword) => setRePassword(rePassword)}
          value={rePassword}
        />
        <TouchableOpacity style={styles.login} onPress={createAccount}>
          <Text>Skapa konto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={login}>
          <Text>Tillbaka</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateAccountView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
