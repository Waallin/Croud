import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";

//firebase

import { doc, getDoc } from "firebase/firestore";
import { database } from "../../Firebase/firebase";

//Views
import CreateEventView from "./CreateEventView";
import AdminHomeView from "./AdminHomeView";
import ProfileView from "./ProfileView";
import ScanView from "./ScanView";
import SettingsView from "./SettingsView";
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
        <Tab.Screen name="Startsida" component={AdminHomeView} />
        <Tab.Screen
          name="Skapa Event"
          children={() => <CreateEventView orgData={orgData} />}
        />
        <Tab.Screen name="Skanna" component={ScanView} />
        <Tab.Screen name="Profil" component={ProfileView} />
        <Tab.Screen name="Inställingar" component={SettingsView} />
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
