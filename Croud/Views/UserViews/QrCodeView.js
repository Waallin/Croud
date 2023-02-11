import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { database } from "../../Firebase/firebase";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
const QrCodeView = (route) => {
  const navigate = useNavigation();
  const ticketCode = route.route.params.uuid;


  const scanned = onSnapshot(doc(database, "Tickets", ticketCode), (doc) => {
    if (doc.data().Scanned == true) {
      navigate.navigate("Ingame", {
        Uuid: ticketCode
      });
    }
});

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
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
