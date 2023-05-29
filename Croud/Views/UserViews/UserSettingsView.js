import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../Styles/global";
import { TextInput } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { database } from "../../Firebase/firebase";
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

const UserSettingsView = (route) => {
  const userData = route.userData;
  const navigate = useNavigation();
  const [value, setValue] = useState(userData.Distance);
  async function logout() {
    const auth = getAuth();

    auth.signOut().then(
      function () {
        // Sign-out successful.
        navigate.replace("login");
      },
      function (error) {
        // An error happened.
      }
    );
  }

  async function save() {
    const ref = doc(database, "Users", userData.Email);
    await updateDoc(ref, {
      Distance: (value)
    });
  }


  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <Text style={globalStyles.primaryTitle}>Inställningar</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          <Text style={globalStyles.primaryText}>
            Avstånd till matcher i närheten: {value} mil
          </Text>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            onValueChange={(value) => setValue(value)}
            value={userData.Distance}
            minimumTrackTintColor={globalStyles.primaryGreen}
            maximumTrackTintColor={globalStyles.primaryGreen}
          />
        </View>
        <View>
          <TouchableOpacity onPress={save} style={globalStyles.primaryGreenBtn}>
            <Text style={globalStyles.primaryBtnText}>Spara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            style={globalStyles.secondaryGreyBtn}
          >
            <Text style={globalStyles.secondaryBtnText}>logga ut</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserSettingsView;

const styles = StyleSheet.create({});
