import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FavouritesView from "./FavouritesView";
import SearchView from "./SearchView";

const UserContainer = ({ route }) => {
  const navigate = useNavigation();
  const Tab = createBottomTabNavigator();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(route.params.userData);
  }, [route.params]);

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
          children={() => <SearchView orgData={userData} />}
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
          children={() => <FavouritesView orgData={userData} />}
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
