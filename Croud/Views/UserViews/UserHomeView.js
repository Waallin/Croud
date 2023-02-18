import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { database } from "../../Firebase/firebase";
import { Entypo } from "@expo/vector-icons";
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import GamesComponent from "./UserComponents/GamesComponent";
import * as Location from "expo-location";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavGamesView from "./FavGamesView";
import NearbyGamesView from "./NearbyGamesView";
import { globalStyles } from "../../Styles/global";
import { color, withDecay } from "react-native-reanimated";

const UserHomeView = ({ userData, location }) => {
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
          tabBarStyle: { backgroundColor: 'rgba(1,1,1, 0)', borderColor: "green", width: "70%" },
        }}
        tabBarStyle={{
          backgroundColor: 'transparent',
        }}
      >
        <Tab.Screen
          name="Favoriter"
          children={() => <FavGamesView userData={userData} />}
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
