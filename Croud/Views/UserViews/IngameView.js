import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalStyles } from '../../Styles/global'
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";import { database } from "../../Firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
const IngameView = ({route}) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;

 async function buyLot() {
  console.log(route.params.user)


    const ref = doc(database, "Games", gameInfo.id);
    await updateDoc(ref, {
      Lots: arrayUnion(userInfo.Email),
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={buyLot}>
        <Text style={globalStyles.primaryBtnText}>Köp lott</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default IngameView

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})