import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

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
    <TouchableOpacity style={active ? styles.activeContainer : styles.container}  onPress={active ? goToTicketView : () => {}}>
      <View style={styles.leftInfo}>
        <Text style={styles.teams}>
          {hometeam} - {opponent}
        </Text>
        <Text>{location}</Text>
      </View>
      <View style={styles.rightInfo}>
        <Text>{day}</Text>
        <Text>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GamesComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    backgroundColor: "white",
    marginBottom: 5,
  },

  activeContainer: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgreen",
    justifyContent: "space-between",
    height: 100,
    marginBottom: 5,
  },

  teams: {
    fontSize: "15px",
    fontWeight: "700",
  },
  rightInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
});
