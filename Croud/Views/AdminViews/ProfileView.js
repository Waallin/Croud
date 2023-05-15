import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../Styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { database } from "../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";

const ProfileView = (route) => {
  const orgData = route.orgData;
  const navigate = useNavigation();
  const [fans, setFans] = useState(null);
  const [games, setGames] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [lots, setLots] = useState(null);
  function logout() {
    navigate.replace("login");
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
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={logout}
          style={globalStyles.secondaryGreyBtn}
        >
          <Text style={globalStyles.secondaryBtnText}>logga ut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({});
