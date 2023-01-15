import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Animated,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { database } from "../../Firebase/firebase";
import { Ionicons } from '@expo/vector-icons'; 

import { doc, getDoc } from "firebase/firestore";

const ScanView = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();

  const askCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  useEffect(() => {
    askCameraPermission();
  }, []);

  //what happen when we scan barcode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("type " + type + " data " + data);
  };

  const [showToast, setShowToats] = useState(false);


  function toastFade() {
    setShowToats(true);
    setTimeout(() => {
      setShowToats(false);
    }, 2500);
  }

  //check permission and return the screen
  if (hasPermission == null) {
    return <Text>requesting for camera permission</Text>;
  }

  if (hasPermission == false) {
    return (
      <View>
        <Text>no access</Text>
        <TouchableOpacity onPress={() => askCameraPermission()}>
          <Text>allow camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? toastFade : handleBarCodeScanned}
        style={{ height: "100%", width: "100%" }}
      />

      <View style={styles.box}></View>
      {showToast ? (
        <View style={styles.toast}>
          <View style={styles.toastSuccessText}><Ionicons name="checkmark-circle" size={52} color="#4BB543" /></View>
          <Text style={styles.toastInfoText}>3 biljetter</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ScanView;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "rgba(255,255,255, 0.3)",
    position: "absolute",
    backgroundColor: "rgba(255,255,255, 0.01)",
    height: 200,
    width: 200,
  },

  toast: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 40,
    padding: 50,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255, 1)",
  },


  toastInfoText: {
    color: "#4BB543",
    fontSize: "50px",
    fontWeight: "400"
  },

  test: {
    position: "absolute",
    backgroundColor: "red",
  },
});
