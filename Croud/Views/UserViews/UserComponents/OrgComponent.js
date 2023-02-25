import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../../Styles/global";
const OrgComponent = ({ Name, Sport, org, userData, date }) => {
  const navigate = useNavigation();
  function goToTeamView() {
    navigate.navigate("TeamView", {
      org: Name,
      userData: userData,
    });
  }

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

  return (
    <TouchableOpacity style={styles.wrapper} onPress={goToTeamView}>
      <View style={styles.leftWrapper}>
        <Text style={styles.nameText}>{Name}</Text>
        <Text style={globalStyles.primaryText}>{Sport}</Text>
      </View>
      <View style={styles.rightWrapper}>
        <Text style={globalStyles.primaryText}>{dayText(date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrgComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    borderRadius: 10
  },
  
  nameText: {
    fontFamily: "Manrope_600SemiBold",
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
