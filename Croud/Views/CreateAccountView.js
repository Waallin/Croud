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
import { set } from "react-native-reanimated";

const CreateAccountView = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();

  const [dangerText, setDangerText] = useState();
  const navigate = useNavigation();

  async function createAccount() {
    if (!name) {
      setDangerText("Vänligen fyll i Namn");
      return;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    } else {
      setDangerText("E-postadressen är inte giltig");
      return;
    }

    if (!password) {
      setDangerText("Vänligen fyll i ett lösenord");
      return;
    } else if (
      password.length >= 8 &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(password)
    ) {
    } else {
      setDangerText(
        "Lösenordet måste vara 8 tecken & innehålla både stor och liten bokstav"
      );
      return;
    }

    if (password != rePassword) {
      setDangerText("Vänligen skriv samma lösenord");
      setPassword("");
      setRePassword("");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(database, "Users", user.email), {
          Email: user.email,
          UserName: name,
          Name: name,
          Favourites: [],
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  function navigateBack() {
    navigate.navigate("login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <TouchableOpacity onPress={navigateBack}>
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
              style={globalStyles.primaryTextInput}
              placeholder={"Namn"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(name) => setName(name)}
              value={name}
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
              style={globalStyles.primaryTextInput}
              placeholder={"Email"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(email) => setEmail(email)}
              value={email}
            />
          </View>
          <View style={globalStyles.primaryInput}>
            <Ionicons
              name="key-outline"
              size={20}
              style={globalStyles.primaryInputIcon}
            />
            <TextInput
              style={globalStyles.primaryTextInput}
              secureTextEntry={true}
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
              style={globalStyles.primaryTextInput}
              secureTextEntry={true}
              placeholder={"Bekräfta lösenord"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(rePassword) => setRePassword(rePassword)}
              value={rePassword}
            />
          </View>
        </View>
        <Text style={globalStyles.dangerText}>{dangerText}</Text>
      </View>
      <View style={styles.botWrapper}>
        <TouchableOpacity
          style={globalStyles.primaryGreenBtn}
          onPress={createAccount}
        >
          <Text style={globalStyles.primaryBtnText}>Skapa konto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.secondaryGreyBtn} onPress={navigateBack}>
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
    flex: 5,
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
    paddingHorizontal: 18,
  },
});
