import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { globalStyles } from "../Styles/global";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { database } from "../Firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
          Favourites: [],
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    navigate.replace("login");
  }

  function login() {
    navigate.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <TouchableOpacity onPress={login}>
        <AntDesign name="left" size={20} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.midWrapper}>
        <View style={styles.textWrapper}>
          <Text style={globalStyles.primaryTitle}>Skapa konto</Text>
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
              style={{ marginLeft: 10 }}
              placeholder={"Namn"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
          </View>
          <View style={globalStyles.primaryInput}>
            <Feather
              name="mail"
              size={20}
              color="black"
              style={globalStyles.primaryInputIcon}
            />
            <TextInput
              style={{ marginLeft: 10 }}
              placeholder={"Email"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
          </View>
          <View style={globalStyles.primaryInput}>
            <Ionicons
              name="key-outline"
              size={20}
              style={globalStyles.primaryInputIcon}
            />
            <TextInput
              style={{ marginLeft: 10 }}
              placeholder={"Lösenord"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
          </View>
          <View style={globalStyles.primaryInput}>
            <Ionicons
              name="key-outline"
              size={20}
              style={globalStyles.primaryInputIcon}
            />
            <TextInput
              style={{ marginLeft: 10 }}
              placeholder={"Bekräfta lösenord"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
          </View>
        </View>
      </View>
      <View style={styles.botWrapper}>
        <TouchableOpacity
          style={globalStyles.primaryGreenBtn}
          onPress={createAccount}
        >
          <Text style={globalStyles.primaryBtnText}>Logga in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.secondaryGreyBtn}
          onPress={createAccount}
        >
          <Text style={globalStyles.secondaryBtnText}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccountView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  topWrapper: {
    flex: 1,
    justifyContent: "center",
  },

  midWrapper: {
    flex: 8,
  },

  botWrapper: {
    flex: 2,
    alignItems: "center",
  },

  inputWrapper: {
    marginTop: 60,
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  textWrapper: {
    paddingHorizontal: 18
  }
});
