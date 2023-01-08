import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Views
import CreateEventView from './CreateEventView';
import AdminHomeView from './AdminHomeView';
import ProfileView from './ProfileView';
import ScanView from './ScanView';
import SettingsView from './SettingsView';
const AdminContainer = () => {

    const navigate = useNavigation();
    const Tab = createBottomTabNavigator();


  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Startsida" component={AdminHomeView} />
        <Tab.Screen name="Skapa event" component={CreateEventView} />
        <Tab.Screen name="Skanna" component={ScanView} />
        <Tab.Screen name="Profil" component={ProfileView} />
        <Tab.Screen name="Inställingar" component={SettingsView} />
      </Tab.Navigator>
    </View>
  )
}

export default AdminContainer

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });
  