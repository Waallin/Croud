import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FavouritesView from "./FavouritesView";
import SearchView from "./SearchView";
import UserHomeView from "./UserHomeView";

const UserContainer = ({ route }) => {
  const Tab = createBottomTabNavigator();
  console.log("test");
  return (
    <View style={styles.container}>
      <Tab.Navigator>
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
          children={() => <UserHomeView route={route.params} />}
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
