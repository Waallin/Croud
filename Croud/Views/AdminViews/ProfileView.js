import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../Styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { database } from "../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";

const ProfileView = (route) => {

  const orgData = route.orgData;
  const navigate = useNavigation();
  const [fans, setFans] = useState(null);


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
    console.log(docSnap.data());

    setFans(docSnap.data().Fans);
  }


  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <Text style={globalStyles.primaryTitle}>Profil</Text>
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
        <Ionicons name="person" size={24} color={globalStyles.primaryGreen} />
        <Text style={{...globalStyles.primaryText, paddingLeft: 6}}>Fans: {fans ? fans.length : 0}</Text>
        </View>
      </View>
      <View style={{alignItems: "center"}}>
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
