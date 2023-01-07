import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const LoginView = () => {
  const navigate = useNavigation();

  return (
    <View>
      <Text>LoginView</Text>
      <TouchableOpacity>
        <Text onPress={() => navigate.replace("HomeAdmin")}>Test</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({});
