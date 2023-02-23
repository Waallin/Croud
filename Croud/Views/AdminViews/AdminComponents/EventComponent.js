import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../../Styles/global";
const EventComponent = ({ Opponent, Time, Location, Day, event }) => {


  const navigate = useNavigation();

  function nav() {
    if (event.Active) {
      navigate.navigate("ActiveGame", {
        event: event
     });
    } else {
      navigate.navigate("StartGame", {
        event: event
     });
    }
  }

  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.leftWrapper}>
        <Text style={styles.opponenText}>{Opponent}</Text>
        <Text style={styles.placeText}>{Location}</Text>
      </View>
      <View style={styles.rightWrapper}>
        <Text style={globalStyles.darkerText}>{Day}</Text>
        <Text style={globalStyles.darkerText}>{Time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  
  opponenText: {
    fontFamily: "Manrope_500Medium",
    fontSize: "20px",
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



/* 
    <TouchableOpacity onPress={nav} style={event.Active ? styles.activeContainer : styles.container}>
      <View style={styles.text}>
        <Text style={styles.title}>{Opponent}</Text>
        <Text style={styles.extraInfo}>{Time}</Text>
        <Text style={styles.extraInfo}>{Location}</Text>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={styles.date}>{Day}</Text>
        {event.Active ? <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" /> : ""}
      </View>
    </TouchableOpacity>
*/