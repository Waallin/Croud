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
import { auth, database } from "../Firebase/firebase";
import { doc, getDoc, setDoc, docSnap } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth } from "firebase/auth";

const LoginView = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        autoLogin(authUser);

        //navigate.replace("UserContainer")
      }
    });
  }, [auth]);

  async function autoLogin(authUser) {


    //Om användare är kund
    const userRef = doc(database, "Users", authUser.email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      navigate.replace("UserContainer", {
        userData: userSnap.data(),
      });
    }
  }
  function createAccount() {
    navigate.replace("CreateAccount");
  }

  async function login() {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Image
          source={require("../assets/croud.png")}
          style={{ width: 800, height: 200 }}
        />
      </View>
      <View style={styles.botWrapper}>
        <TextInput
          placeholder={"Email"}
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          placeholder={"Password"}
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <TouchableOpacity style={styles.login} onPress={login}>
          <Text>Logga in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={createAccount}>
          <Text>Skapa konto</Text>
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
    justifyContent: "center",
    alignItems: "center",
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
