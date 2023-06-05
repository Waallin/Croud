import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { globalStyles } from "../../Styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { database } from "../../Firebase/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const ProfileView = (route) => {
  const orgData = route.orgData;
  const navigate = useNavigation();
  const [fans, setFans] = useState(null);
  const [games, setGames] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [squad, setSquad] = useState(null);

  //add user to squad
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  const [lots, setLots] = useState(null);
  function logout() {
    navigate.replace("login");
  }

  let bottomSheetModalRef = useRef(null);
  const snapPoints = ["85%"];
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  async function getData() {
    const docRef = doc(database, "Organisations", orgData.Name);
    const docSnap = await getDoc(docRef);
    setGames(docSnap.data().Gamedays);
    setTickets(docSnap.data().Tickets);
    setFans(docSnap.data().Fans);
    setSquad(docSnap.data().Squad);
  }

  function squadView() {
    handlePresentModal();
  }

  async function addToSquad() {
    console.log(orgData);
    let obj = {
      name: name,
      number: parseInt(number)
    }

    console.log(obj)
    const ref = doc(database, "Organisations", orgData.Name);
    // Set the "capital" field of the city 'DC'
    await updateDoc(ref, { Squad: arrayUnion(obj) }, { merge: true });

  }

  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <Text style={globalStyles.primaryTitle}>
          {orgData ? orgData.Name : null}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <Ionicons name="person" size={24} color={globalStyles.primaryGreen} />
          <Text style={{ ...globalStyles.primaryText, paddingLeft: 15 }}>
            {fans ? fans.length : 0} följare
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <Ionicons
            name="medal-sharp"
            size={24}
            color={globalStyles.primaryGreen}
          />
          <Text style={{ ...globalStyles.primaryText, paddingLeft: 15 }}>
            {games ? games.length : 0} matcher
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <MaterialCommunityIcons
            name="ticket-confirmation"
            size={24}
            color={globalStyles.primaryGreen}
          />
          <Text style={{ ...globalStyles.primaryText, paddingLeft: 15 }}>
            {tickets ? tickets.length : 0} sålda biljetter
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <AntDesign name="team" size={24} color={globalStyles.primaryGreen} />
          <TouchableOpacity onPress={squadView}>
            <Text
              style={{
                ...globalStyles.primaryText,
                paddingLeft: 15,
                textDecorationLine: "underline",
              }}
            >
              {squad ? squad.length : 0 } spelare i truppen
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 30 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, padding: 20 }}>
              <View style={{ flex: 1 }}>
                {squad.map((i) => {
                  return(
                  <View style={{flexDirection: "row",borderBottomWidth: 1, justifyContent: "space-between"  ,borderBottomColor:globalStyles.primaryGreen, padding: 10}}>
                    <Text style={{...globalStyles.primaryText}}>{i.name}</Text>
                    <Text style={{...globalStyles.primaryText, marginLeft: 10}}>nr: {i.number}</Text>
                  </View>
                  )
                })}
                <View></View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={globalStyles.primaryTextInput}
                  placeholder={"Namn"}
                  onChangeText={(name) => setName(name)}
                  value={name}
                  placeholderTextColor={globalStyles.secondaryGrey}
                />
                <TextInput
                  style={globalStyles.primaryTextInput}
                  placeholder={"Nummer"}
                  onChangeText={(number) => setNumber(number)}
                  value={number}
                  placeholderTextColor={globalStyles.secondaryGrey}
                />
                <TouchableOpacity onPress={addToSquad}>
                  <AntDesign
                    name="adduser"
                    size={42}
                    color={globalStyles.primaryGreen}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({});
