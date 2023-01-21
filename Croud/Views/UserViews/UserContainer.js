import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FavouritesView from "./FavouritesView";
import SearchView from "./SearchView";
import TeamView from "./TeamView";

const UserContainer = ({ route }) => {
  const Tab = createBottomTabNavigator();


  return (
    <View style={styles.container}>
      <Tab.Navigator>
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
          name="Skapa Event"
          children={() => <FavouritesView userData={route.params} />}
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
