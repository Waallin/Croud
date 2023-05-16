import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../Styles/global";
import { database } from "../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "react-native-wheel-pick";
export default function LotView({ route }) {
  const gameInfo = route.params.gameInfo;
  const newGameInfo = route.params.newGameInfo;
  const userInfo = route.params.userInfo;
  const navigate = useNavigation();

  const [lots, setLots] = useState([]);
  const [choosenLot, setChoosenLot] = useState("1");

  const [error, setError] = useState("");

  const [updatedLots, setUpdatedLots] = useState();
  

  useEffect(() => {
    getLots();
  }, []);

  function goBack() {
    navigate.goBack();
  }

  useEffect(() => {
    // prenumerera på förändringar i Firestore-databasen
    const userDocRef = doc(database, "Games", gameInfo.id);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const newUserData = docSnapshot.data();
        const newLots = newUserData.Lots;
        
        let filter = newLots ? newLots.map((i => i.lotNumber)) : [];

        setUpdatedLots(filter)
      }
    });

    // avsluta prenumerationen när komponenten avmonteras
    return () => {
      unsubscribe();
    };
  }, [gameInfo.id]);

  
  async function getLots() {
    
    const numbers = [];
    let takenLots = newGameInfo.Lots;
    let mappedTaken = takenLots ? takenLots.map((x) => x.lotNumber) : [];
    for (let i = 1; i < newGameInfo.MaxLots; i++) {
      if (!mappedTaken.includes(i)) {
        
        numbers.push(i);
      }
    }
    setLots(numbers);
  }

  async function buyLot() {

    let x = updatedLots.includes(parseInt(choosenLot));

    if (x) {
      setError("tyvärr hann någon före. Testa något annt nummer")
      return;
    }
    
    const ref = doc(database, "Games", gameInfo.id);

    const userSnapshot = await getDoc(ref);
    let array = userSnapshot.data().Lots;
    if (!Array.isArray(array)) {
      array = [];
    }
    const newLot = {
      lotNumber: parseInt(choosenLot),
      name: userInfo.Name,
      email: userInfo.Email,
    };
    array.push(newLot);
    await updateDoc(ref, { Lots: array });
    navigate.goBack(); 
  }


  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={styles.wrapper}>
        <Picker
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.01)",
            width: 300,
            height: 215,
          }}
          selectedValue={"1"}
          pickerData={lots}
          onValueChange={(value) => {
            setChoosenLot(value);
          }}
          itemSpace={30} // this only support in android
        />
        <Text style={globalStyles.primaryText}>{error}</Text>
        <TouchableOpacity
          style={{ ...globalStyles.primaryGreenBtn, marginTop: 50 }}
          onPress={buyLot}
        >
          <Text style={globalStyles.primaryBtnText}>Köp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.secondaryGreyBtn}
          onPress={goBack}
        >
          <Text style={globalStyles.secondaryBtnText}>Tillbaka</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
