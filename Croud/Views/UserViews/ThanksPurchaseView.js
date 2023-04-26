import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from "react";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalStyles } from '../../Styles/global'
import QRCode from "react-native-qrcode-svg";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const ThanksPurchaseView = ({route}) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;
  const qrCode = route.params.qrCode
  const [scanned, setScanned] = useState(false);

  useEffect(() => {   
      const scanned = onSnapshot(doc(database, "Tickets", qrCode), (doc) => {
        if (doc.data().Scanned == true) {
          setScanned(true);
      };
  }, []);
})

function navToMatch() {
  console.log(route);
  
  navigate.replace("IngameView",
  {
    game: gameInfo,
    user: userInfo,
    qrCode: qrCode,
    ticket: true,
    qrScanned: scanned
  }) 
}
  
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text style={{...globalStyles.primaryTitle, fontSize: "32px", marginBottom: 50 }}>Tack för ditt köp!</Text>
      {qrCode ? (
              !scanned ? 
              <QRCode
                value={qrCode}
                size={200}
                color="black"
              /> : 
              <View>
              <AntDesign name="checkcircleo" size={200} color={globalStyles.primaryGreen} />
              </View>
            ) : null}
      <TouchableOpacity style={{...globalStyles.primaryGreenBtn, marginTop: 50}} onPress={navToMatch}>
        <Text style={globalStyles.primaryBtnText}>Fortsätt</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ThanksPurchaseView

const styles = StyleSheet.create({})