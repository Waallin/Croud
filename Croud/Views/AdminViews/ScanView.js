import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { database } from "../../Firebase/firebase";

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

  function abc() {
    setText("3cf168df-e9ad-4903-b45d-32f6bc272975");
  }
  async function getdb() {

    console.log(text);
    
    const docRef = doc(database, "Games", text);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
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
        onBarCodeScanned={scanned ? getdb : handleBarCodeScanned}
        style={{ height: 400, width: 400 }}
      />
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={getdb}>
        <Text>Console db</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={abc}>
        <Text>abc</Text>
      </TouchableOpacity>
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

  text: {
    fontSize: "30px",
  },
});
