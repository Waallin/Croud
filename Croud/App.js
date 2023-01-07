import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "./Views/LoginView";
import AdminHomeView from "./Views/AdminViews/AdminHomeView";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#0E70A7",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "700",
            },
          }}
          name="login"
          component={LoginView}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#0E70A7",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "700",
            },
          }}
          name="HomeAdmin"
          component={AdminHomeView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
