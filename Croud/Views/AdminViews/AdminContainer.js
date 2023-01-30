import { StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";

import AdminHomeView from "./AdminHomeView";
import ScanView from "./ScanView";
import SettingsView from "./SettingsView";

const AdminContainer = ({ route }) => {
  const Tab = createBottomTabNavigator();

  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    setOrgData(route.params.orgData);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#0891B2",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={24} color="black" />
            ),
          }}
          name="Favoriter"
          children={() => <AdminHomeView orgData={orgData} route={route} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#0891B2",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="scan1" size={24} color="black" />
            ),
          }}
          name="Skanna"
          children={() => <ScanView orgData={orgData} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "black",
            tabBarActiveBackgroundColor: "#0891B2",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" size={24} color="black" />
            ),
          }}
          name="Inställningar"
          children={() => <SettingsView orgData={orgData} />}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AdminContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
