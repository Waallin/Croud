import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../Styles/global";
import { database } from "../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { Picker, DatePicker } from "react-native-wheel-pick";
export default function LotView({ route }) {
  const gameInfo = route.params.gameInfo;
  const userInfo = route.params.userInfo;
  const navigate = useNavigation();

  const [lots, setLots] = useState([]);
  const [choosenLot, setChoosenLot] = useState(null);

  useEffect(() => {
    console.log(gameInfo)
    const numbers = [];
    let takenLots = gameInfo.lots;

    let mappedTaken = takenLots.map((x) => x.lotNumber);
    for (let i = 1; i < gameInfo.maxLots; i++) {
      if (!mappedTaken.includes(i)) {
        numbers.push(i);
      }
    }
    //console.log(numbers)
    setLots(numbers);
  }, []);

  function chooseNumber(a) {
    setChoosenLot(a);
  }

  function goBack() {
    navigate.goBack();
  }

  async function buyLot() {
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
                        selectedValue={"16"}
                        pickerData={lots}
                        onValueChange={(value) => {setChoosenLot(value)}}
                        itemSpace={30} // this only support in android
                      />
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
    alignItems: "center"
  }
});
