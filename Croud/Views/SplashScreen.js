import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/croud.png")} />
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
    backgroundColor: "#F8F8F8",
    height: "100%",
    width: "100%",
  },

  logo: {
    width: 400,
    height: 400,
  },
});
