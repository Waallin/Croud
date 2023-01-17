import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
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


    //Om användare är kund
    const userRef = doc(database, "Users", username);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      if (password === userSnap.data().Password) {
        navigate.navigate("UserContainer", {
         userData: userSnap.data()
        });

      }
    } else {
      setPassword("");
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    //Om användare är admin
    const orgRef = doc(database, "Organisations", username);
    const orgSnap = await getDoc(orgRef);

    if (orgSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      if (password === orgSnap.data().Password) {
        navigate.navigate("AdminContainer", {
         orgData: orgSnap.data()
        });

      }
    } else {
      setPassword("");
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
      <Image source={require('../assets/croud.png')}
   style = {{ width: 800, height: 200 }}
   />
      </View>
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
    justifyContent: 'center',
    alignItems: 'center'
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
