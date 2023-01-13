import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

const EventComponent = ({opponent, time, place, day}) => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.title}>{opponent}</Text>
        <Text style={styles.extraInfo}>{time}</Text>
        <Text style={styles.extraInfo}>{place}</Text>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={styles.date}>{day}</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
      </View>
    </View>
  );
};

export default EventComponent;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: "#b1b1b1"
  },

  text: {
    flex: 5,
  },

  title: {
    fontWeight: "700",
    fontSize: "20px"
  },

  extraInfo: {
    color: "grey",
    paddingTop: 5,
    fontSize: "15px",
    fontWeight: "500"
  },

  dateWrapper: {
    flex: 1.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  date: {
    color: "grey",
    paddingRight: 15,
  },

});
