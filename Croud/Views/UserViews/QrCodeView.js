import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { database } from "../../Firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
const QrCodeView = (route) => {
  async function testing() {
    console.log(route.route.params.uuid);

    const washingtonRef = doc(database, "Tickets", route.route.params.uuid);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      Scanned: true,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={testing}>
        <QRCode
          value={route.route.params.uuid}
          size={100}
          color="black"
          backgroundColor="lightblue"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QrCodeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
