import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SettingsView = () => {
  const navigate = useNavigation();
  function logout() {
    console.log(navigate.navigate("login"));
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>Inställningar</Text>
      </View>
      <View style={styles.botWrapper}>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <View>
            <Text style={styles.logoutText}>Logga ut</Text>
          </View>
          <View>
            <MaterialIcons name="logout" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topWrapper: {
    flex: 0.15,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "lightgrey",
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: "40px",
    paddingBottom: 15,
    fontWeight: "700",
  },

  botWrapper: {
    flex: 1,
  },

  botWrapper: {
    alignItems: "center",
    marginTop: 30,
  },

  logoutText: {
    fontSize: "20px",
    fontWeight: "500",
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
});
