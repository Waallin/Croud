import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
const OrgComponent = ({ Name, Sport, org }) => {


  function addToFavourite() {
    console.log(org);
  }

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.title}>{Name}</Text>
        <Text style={styles.extraInfo}>{Sport}</Text>
      </View>
      <TouchableOpacity style={styles.like} onPress={addToFavourite}>
        <MaterialIcons name="favorite" size={32} color="#0891B2" />
      </TouchableOpacity>
    </View>
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
