import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateEventView from "./CreateEventView";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const AdminHomeView = () => {
  const navigate = useNavigation();
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Text>home</Text>
    </View>
  );
};

export default AdminHomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
