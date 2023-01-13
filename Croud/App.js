import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "./Views/LoginView";
import AdminHomeView from "./Views/AdminViews/AdminHomeView";
import AdminContainer from "./Views/AdminViews/AdminContainer";
import CreateEventView from "./Views/AdminViews/CreateEventView";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="login"
          component={LoginView}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="AdminContainer"
          component={AdminContainer}
        />

        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="HomeAdmin"
          component={AdminHomeView}
        />
                <Stack.Screen
          options={{
            headerShown: false
          }}
          name="CreateEvent"
          component={CreateEventView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
