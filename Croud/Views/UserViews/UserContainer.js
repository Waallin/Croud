import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FavouritesView from "./FavouritesView";
import SearchView from "./SearchView";
import UserHomeView from "./UserHomeView";
import UserSettingsView from "./UserSettingsView";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
const UserContainer = ({ route }) => {
  const Tab = createBottomTabNavigator();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log(currentLocation)
  };
  getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Tab.Navigator
            initialRouteName="Hemskärm">
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#0891B2",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={24} color="black" />
            ),
          }}
          name="Hemskärm"
          children={() => <UserHomeView userData={route.params} location={location} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#0891B2",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="search1" size={24} color="black" />
            ),
          }}
          name="Sök förening"
          children={() => <SearchView userData={route.params} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#0891B2",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite-outline" size={24} color="black" />
            ),
          }}
          name="Favoriter"
          children={() => <FavouritesView userData={route.params} />}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#0891B2",
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" size={24} color="black" />
            ),
          }}
          name="Iställningar"
          children={() => <UserSettingsView />}
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
