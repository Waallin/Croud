import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { globalStyles } from "../Styles/global";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Croud</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
    position: "absolute",
    backgroundColor: globalStyles.primaryGreen,
    height: "100%",
    width: "100%",
  },

  text: {
    fontSize: "27px",
    color: "white",
    fontStyle: "italic",
    fontWeight: "800"
  },
});
