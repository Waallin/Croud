import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavouritesView from "./FavouritesView";
import SearchView from "./SearchView";
import UserHomeView from "./UserHomeView";
import UserSettingsView from "./UserSettingsView";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { globalStyles } from "../../Styles/global";
import { Ionicons } from "@expo/vector-icons";
import { database
 } from "../../Firebase/firebase";
 import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const UserContainer = ({ route }) => {
  const Tab = createBottomTabNavigator();


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const [userData, setUserData] = useState(route.params.userData);

  useEffect(() => {
    // prenumerera på förändringar i Firestore-databasen
    const userDocRef = doc(database, "Users", userData.Email);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const newUserData = docSnapshot.data();
        setUserData(newUserData);
        console.log(newUserData)
      }
    });

    // avsluta prenumerationen när komponenten avmonteras
    return () => {
      unsubscribe();
    };
  }, [userData.Email]);



  useEffect(() => {
    
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Hemskärm">
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
            ),
          }}
          name="Hemskärm"
          children={() => (
            <UserHomeView userData={userData} location={location} />
          )}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "search-sharp" : "search-outline"}
                size={24}
                color={globalStyles.primaryGreen}
              />
            ),
          }}
          name="Sök förening"
          children={() => <SearchView userData={userData} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "red",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "heart-sharp" : "heart-outline"}
                size={24}
                color={globalStyles.primaryGreen}
              />
            ),
          }}
          name="Favoriter"
          children={() => <FavouritesView userData={userData} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "red",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={24}
                color={globalStyles.primaryGreen}
              />
            ),
          }}
          name="Iställningar"
          children={() => <UserSettingsView userData={userData} />}
        />
      </Tab.Navigator>
    </View>
  );
};

export default UserContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
