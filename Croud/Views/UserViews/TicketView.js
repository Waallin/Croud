import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../../Styles/global";

const TicketView = ({ route }) => {
  const navigate = useNavigation();
  const gameInfo = route.params.game;
  const userInfo = route.params.user;

  function navigateBack() {
    navigate.goBack();
  }

  function navigateToSwish() {
    navigate.replace("Swish", {
      game: gameInfo,
      user: userInfo,
      newTicket: false,
    });
  }

  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="left" size={20} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.teamsWrapper}>
        <View style={styles.homeTeam}>
          <Text style={globalStyles.smallerTitle}>{gameInfo.hometeam}</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={globalStyles.primaryTitle}>{gameInfo.time}</Text>
          <Text>{gameInfo.day}</Text>
        </View>
        <View style={styles.opponentTeam}>
          <Text style={globalStyles.smallerTitle}>{gameInfo.opponent}</Text>
        </View>
      </View>
      <View style={styles.infoText}>
        <Text style={globalStyles.primaryText}>{gameInfo.text}</Text>
        <View style={styles.buttonWrapper}>
          <View>
            <TouchableOpacity
              style={globalStyles.primaryGreenBtn}
              onPress={navigateToSwish}
            >
              <Text style={globalStyles.primaryBtnText}>Köp biljett</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.secondaryGreyBtn}
              onPress={navigateBack}
            >
              <Text style={globalStyles.secondaryBtnText}>Tillbaka</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TicketView;

const styles = StyleSheet.create({
  midWrapper: {
    flex: 1,
  },

  teamsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },

  homeTeam: {
    width: "30%",
    alignItems: "flex-start",
  },

  opponentTeam: {
    width: "30%",

    alignItems: "flex-end",
  },

  timeWrapper: {
    width: "36%",
    alignItems: "center",
  },

  infoText: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
    padding: 20,
  },

  buttonWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
