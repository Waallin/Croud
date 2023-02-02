import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const OrgComponent = ({ Name, Sport, org, userData, date }) => {
  const navigate = useNavigation();

  function goToTeamView() {
    navigate.navigate("TeamView", {
      org: org,
      userData: userData,
    });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={goToTeamView}>
      <View style={styles.text}>
        <Text style={styles.title}>{Name}</Text>
        <Text style={styles.extraInfo}>{Sport}</Text>
      </View>
      <View>
        <Text>
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrgComponent;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: "#b1b1b1",
    alignItems: "center",
    backgroundColor: "white"
  },

  text: {
    flex: 5,
  },

  title: {
    fontWeight: "700",
    fontSize: "20px",
  },

  extraInfo: {
    color: "grey",
    paddingTop: 5,
    fontSize: "15px",
    fontWeight: "500",
  },

  like: {
    marginRight: 15,
  },
});
