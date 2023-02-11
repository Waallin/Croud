import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "./Views/LoginView";
import AdminHomeView from "./Views/AdminViews/AdminHomeView";
import AdminContainer from "./Views/AdminViews/AdminContainer";
import UserContainer from "./Views/UserViews/UserContainer";
import TeamView from "./Views/UserViews/TeamView";
import TicketView from "./Views/UserViews/TicketView";
import QrCodeView from "./Views/UserViews/QrCodeView";
import CreateAccountView from "./Views/CreateAccountView";
import { LogBox } from "react-native";
import UserHomeView from "./Views/UserViews/UserHomeView";
import StartGameView from "./Views/AdminViews/StartGameView";
import ActiveGameView from "./Views/AdminViews/ActiveGameView";
import IngameView from "./Views/UserViews/IngameView";
export default function App() {
  const Stack = createNativeStackNavigator();
  //Ignore some errors
  LogBox.ignoreLogs([
    "Warning: Async Storage has been extracted from react-native core",
  ]);
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
          name="CreateAccount"
          component={CreateAccountView}
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
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="UserHome"
          component={UserHomeView}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="StartGame"
          component={StartGameView}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ActiveGame"
          component={ActiveGameView}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Ingame"
          component={IngameView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
