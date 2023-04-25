import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { arrayUnion, doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../../Styles/global'
import { database } from "../../Firebase/firebase";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
export default function LotView( {route} ) {
    const gameInfo = route.params.gameInfo;
    const userInfo = route.params.userInfo;
    const navigate = useNavigation();

    const [lots, setLots] = useState([]);
    const [choosenLot, setChoosenLot] = useState(null);
    
    useEffect(() => {
        const numbers = [];
        let takenLots = gameInfo.lots;

        let mappedTaken = takenLots.map((x => x.lotNumber))
        console.log(mappedTaken)
        for (let i = 1; i < gameInfo.maxLots; i++) {
            if (!mappedTaken.includes(i)) {
            numbers.push(i);
            }
        }
        setLots(numbers)
    }, []) 

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
            lotNumber: choosenLot,
            name: userInfo.Name,
            email: userInfo.Email
        };
        array.push(newLot);
        await updateDoc(ref, { Lots: array });
        navigate.goBack();
    }
  return (
    <SafeAreaView style={globalStyles.primaryContainer}>

        <View style={styles.boxContainer}>
        {lots.map(number => 
        <TouchableOpacity style={styles.box} onPress={(() => {chooseNumber(number)})}>
            <Text style={{color: "white"}}>{number}</Text>
        </TouchableOpacity>)
        }
        {choosenLot ?
                <TouchableOpacity style={{...globalStyles.primaryGreenBtn, marginTop: 50}} onPress={buyLot}>
                <Text style={globalStyles.primaryBtnText}>Köp nr {choosenLot}</Text>
            </TouchableOpacity> : null }
            <TouchableOpacity style={globalStyles.secondaryGreyBtn} onPress={goBack}>
                <Text style={globalStyles.secondaryBtnText}>Tillbaka</Text>
            </TouchableOpacity> 
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    boxContainer: {
        flex: 1,
        marginTop: 50,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    box: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: globalStyles.primaryGreen,
        margin: 5
    }
})