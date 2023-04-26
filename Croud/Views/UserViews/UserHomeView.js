import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavGamesView from "./FavGamesView";
import NearbyGamesView from "./NearbyGamesView";
import { globalStyles } from "../../Styles/global";
import { useFocusEffect } from "@react-navigation/native";

const UserHomeView = ({ userData, location }) => {
  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, [])
  );

  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView edges={["top"]} style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <Text style={globalStyles.primaryTitle}>Evenemang</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: globalStyles.primaryBlack,
          tabBarInactiveTintColor: globalStyles.primaryGreen,
          tabBarStyle: {
            backgroundColor: "rgba(1,1,1, 0)",
            borderColor: "green",
            width: "70%",
          },
        }}
        tabBarStyle={{
          backgroundColor: "transparent",
        }}
      >
        <Tab.Screen
          name="Favoriter"
          children={() => (
            <FavGamesView isFocused={isFocused} userData={userData} />
          )}
        />
        <Tab.Screen
          options={{
            tabBarActiveBackgroundColor: "#0891B2",
          }}
          name="Närheten"
          children={() => (
            <NearbyGamesView userData={userData} location={location} />
          )}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default UserHomeView;

const styles = StyleSheet.create({});
