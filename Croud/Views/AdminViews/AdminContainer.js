import { StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../../Styles/global";
import AdminHomeView from "./AdminHomeView";
import ScanView from "./ScanView";
import { Ionicons } from '@expo/vector-icons'; 
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
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "md-home" : "md-home-outline"}
                size={24}
                color={globalStyles.primaryGreen}
              />
            )
          }}
          name="Favoriter"
          children={() => <AdminHomeView orgData={orgData} route={route} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name="scan-outline"
                size={focused ? 30 : 24}
                color={globalStyles.primaryGreen}
              />
            ),
          }}
          name="Skanna"
          children={() => <ScanView orgData={orgData} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "red",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline" } 
                size={24}
                color={globalStyles.primaryGreen}
              />
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
