import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "./Views/LoginView";
import AdminHomeView from "./Views/AdminViews/AdminHomeView";
import AdminContainer from "./Views/AdminViews/AdminContainer";
import CreateEventView from "./Views/AdminViews/CreateEventView";
import UserContainer from "./Views/UserViews/UserContainer";
import TeamView from "./Views/UserViews/TeamView";
import TicketView from "./Views/UserViews/TicketView";
import QrCodeView from "./Views/UserViews/QrCodeView";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="login"
          component={LoginView}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AdminContainer"
          component={AdminContainer}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeAdmin"
          component={AdminHomeView}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="CreateEvent"
          component={CreateEventView}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="UserContainer"
          component={UserContainer}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TeamView"
          component={TeamView}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TicketView"
          component={TicketView}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="QrCodeView"
          component={QrCodeView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
