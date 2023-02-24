import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../../Styles/global";
const GamesComponent = ({
  opponent,
  time,
  day,
  location,
  hometeam,
  game,
  active,
}) => {
  const navigate = useNavigation();

  function goToTicketView() {
    navigate.navigate("TicketView", {
      game: game,
      active: active
    });
  }

  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.leftWrapper}>
        <Text style={styles.teamText}>{hometeam} - {opponent}</Text>
        <Text style={styles.placeText}>{location}</Text>
      </View>
      <View style={styles.rightWrapper}>
        <Text style={globalStyles.darkerText}>{day}</Text>
        <Text style={globalStyles.darkerText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GamesComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  
  teamText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: "16px",
    paddingVertical: 3
  },

  placeText: {
    fontFamily: "Manrope_500Medium",
    fontSize: "14px",
    paddingVertical: 3
  },

  rightWrapper: {
    alignItems: "flex-end",
    justifyContent: "center"
  }

});
