import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../Styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const SettingsView = () => {
  const navigate = useNavigation();

  function logout() {
    navigate.replace("login");
  }

  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <Text style={globalStyles.primaryTitle}>Inställningar</Text>
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

export default SettingsView;

const styles = StyleSheet.create({});
