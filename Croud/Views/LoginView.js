import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { globalStyles } from "../Styles/global";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from "../Firebase/firebase";
import { doc, getDoc, setDoc, docSnap } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import SplashScreen from "./SplashScreen";

const LoginView = (props) => {
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isReady, setReady] = useState(false);
  const [password, setPassword] = useState();
  const [dangerText, setDangerText] = useState();
  const navigate = useNavigation();
  const auth = getAuth();

  const route = useRoute();

  const [splashScreen, setSplashScreen] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        route.params.setAppReady()
        autoLogin(authUser);
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
    navigate.navigate("CreateAccount");
  }

  function newPassword() {
    navigate.navigate("NewPassword");
  }

  async function login() {
    if (!email || !password) {
      setErrorMessage("Fel användarnamn eller lösenord. försök igen")
      return;
    }
    const docRef = doc(database, "Organisations", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (password === docSnap.data().Password) {
        navigate.replace("AdminContainer", {
          orgData: docSnap.data(),
        });
      }
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((err) => {
        // console.log(err.code);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Image
          source={require("../assets/Background.jpg")}
          style={styles.background}
        />
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.35)", "rgba(245, 245, 245, 1)"]}
          style={styles.linearBackground}
        ></LinearGradient>
      </View>
      <View style={styles.botWrapper}>
        <View style={styles.textWrapper}>
          <Text style={globalStyles.primaryTitle}>Välkommen till Croud</Text>
          <Text style={globalStyles.darkerText}>
            Hitta nästa match att gå på
          </Text>
        </View>
        <View style={styles.inputWrapper}>
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
          <View>
          <Text style={globalStyles.dangerText}>{errorMessage}</Text>
            <Text style={globalStyles.dangerText}>{dangerText}</Text>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
              paddingHorizontal: 35,
            }}
          >
            <TouchableOpacity onPress={newPassword}>
              <Text style={globalStyles.darkerText}>Glömt lösenord?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={globalStyles.primaryGreenBtn}
            onPress={login}
          >
            <Text style={globalStyles.primaryBtnText}>Logga in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={createAccount}>
            <Text style={globalStyles.darkerText}>
              Har du inget konto? Skapa konto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    position: "absolute",
  },

  topWrapper: {
    flex: 1,
  },

  textWrapper: {
    marginTop: -100,
    alignItems: "center",
  },

  linearBackground: {
    flex: 1,
    top: 0,
    left: 0,
  },

  botWrapper: {
    flex: 1,
  },

  inputWrapper: {
    marginTop: 30,
    height: "60%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },

  splashScreen: {
    flex: 1,
    zIndex: 999,
    backgroundColor: "green",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
