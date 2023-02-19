import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
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
import { globalStyles } from "./Styles/global";
import ActiveGameView from "./Views/AdminViews/ActiveGameView";
import IngameView from "./Views/UserViews/IngameView";
import { useFonts } from "expo-font";
import NewPasswordView from "./Views/NewPasswordView";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
export default function App() {
  const [isReady, setReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Manrope: require("././assets/fonts/Manrope-VariableFont_wght.ttf"),
  });



  
  useEffect(() => {
    // Perform some sort of async data or asset fetching.

    setTimeout(() => {
      setReady(true);
    }, 8000);
  }, []);


  const Stack = createNativeStackNavigator();

  //Ignore some errors
  LogBox.ignoreLogs(['AsyncStorage has been extracted']);
  return (
    <>
      {!isReady ? (
        <View style={styles.splashScreen}>
          <FontAwesome name="wheelchair-alt" size={50} color="black" />
          <ActivityIndicator size="large" style={{marginTop: 20}} />
        </View>
      ) : null}
      {fontsLoaded ? (      <NavigationContainer styles={styles.container}>
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
            name="NewPassword"
            component={NewPasswordView}
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
      </NavigationContainer>) : ""}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  splashScreen: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
    position: "absolute",
    backgroundColor: globalStyles.primaryGreen,
    height: "100%",
    width: "100%",
  },
});
