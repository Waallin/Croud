import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "./Views/LoginView";
import AdminHomeView from "./Views/AdminViews/AdminHomeView";
import AdminContainer from "./Views/AdminViews/AdminContainer";
import UserContainer from "./Views/UserViews/UserContainer";
import TeamView from "./Views/UserViews/TeamView";
import TicketView from "./Views/UserViews/TicketView";
import CreateAccountView from "./Views/CreateAccountView";
import { LogBox } from "react-native";
import UserHomeView from "./Views/UserViews/UserHomeView";
import StartGameView from "./Views/AdminViews/StartGameView";
import ActiveGameView from "./Views/AdminViews/ActiveGameView";
import IngameView from "./Views/UserViews/IngameView";
import { useFonts } from "expo-font";
import NewPasswordView from "./Views/NewPasswordView";
import {
  Manrope_700Bold,
  Manrope_600SemiBold,
  Manrope_500Medium,
} from "@expo-google-fonts/manrope";
import { useEffect, useState } from "react";
import SplashScreen from "./Views/SplashScreen";
import SwishView from "./Views/UserViews/SwishView";
import LotView from "./Views/UserViews/LotView";
import ThanksPurchaseView from "./Views/UserViews/ThanksPurchaseView";
import FavGamesView from "./Views/UserViews/FavGamesView";

export default function App() {
  const [isReady, setReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_500Medium,
  });

  useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setAppReady();
  }, []);

  const Stack = createNativeStackNavigator();

  function setAppReady() {
    setReady(false);
    setTimeout(() => {
      setReady(true);
    }, 4000);
  }

  //Ignore some errors
  LogBox.ignoreLogs(["AsyncStorage has been extracted"]);
  LogBox.ignoreLogs(['expo-app-loading is deprecated']);
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  LogBox.ignoreLogs(['DevTools failed to load source map: ']);
  LogBox.ignoreLogs(['mote debugger is in a background tab which may cause apps to perform slowly.']);
  return (
    <>
      {!isReady ? <SplashScreen /> : null}
      {fontsLoaded ? (
        <NavigationContainer styles={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="login"
              component={LoginView}
              initialParams={{ setAppReady }}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="CreateAccount"
              component={CreateAccountView}
              initialParams={{ setAppReady }}
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
              name="UserHome"
              component={UserHomeView}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="favGamesView"
              component={FavGamesView}
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
              name="IngameView"
              component={IngameView}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Swish"
              component={SwishView}
            />

            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="LotView"
              component={LotView}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ThanksPurchaseView"
              component={ThanksPurchaseView}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        ""
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
