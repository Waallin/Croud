import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../../Styles/global";
import ActiveComponent from "./ActiveComponent";
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

  function dayText(a) {
    const currentDate = new Date();
    let today = currentDate.toISOString().split("T")[0];
    let tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    switch(a) {
      case today:
        return "Idag";
        case tomorrow:
          return "Imorgon";
        default: 
        return a;
    } 
  }
  
  function goToTicketView() {
    navigate.navigate("TicketView", {
      game: game,
      active: active,
    });
  }

  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.leftWrapper}>
        <Text style={styles.teamText}>
          {hometeam} - {opponent} {active ? <ActiveComponent/> : null}
        </Text>
        <Text style={globalStyles.primaryText}>{location}</Text>
      </View>
      <View style={styles.rightWrapper}>
        <Text style={globalStyles.primaryText}>{dayText(day)}</Text>
        <Text style={globalStyles.primaryText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GamesComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
  },

  teamText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: "16px",
    paddingVertical: 3,
  },

  placeText: {
    fontFamily: "Manrope_500Medium",
    fontSize: "14px",
    paddingVertical: 3,
  },

  rightWrapper: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
