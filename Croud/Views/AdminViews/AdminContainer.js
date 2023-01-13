import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";

//icons
import { AntDesign } from '@expo/vector-icons';

//firebase

import { doc, getDoc } from "firebase/firestore";
import { database } from "../../Firebase/firebase";

//Views
import CreateEventView from "./CreateEventView";
import AdminHomeView from "./AdminHomeView";
import ProfileView from "./ProfileView";
import ScanView from "./ScanView";
import SettingsView from "./SettingsView";
import { SafeAreaView } from "react-native-safe-area-context";
const AdminContainer = ({ route, navigation }) => {
  const navigate = useNavigation();
  const Tab = createBottomTabNavigator();

  const [orgData, setOrgData] = useState([]);
  const { itemId, otherParam } = route.params;
  useEffect(() => {
    getOrgData();
  }, []);

  async function getOrgData() {
    setOrgData(route.params.orgData);
    console.log(orgData);
  }
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
          name="Skapa Event"
          children={() => <AdminHomeView orgData={orgData} />}
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
