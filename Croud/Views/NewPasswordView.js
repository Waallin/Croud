import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../Styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const NewPasswordView = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState();

  function navigateBack() {
    navigate.navigate("login");
  }

  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="left" size={20} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.midWrapper}>
        <View style={styles.textWrapper}>
          <Text style={globalStyles.primaryTitle}>Glömt lösenordet?</Text>
          <Text style={globalStyles.primaryText}>
            Lorem ipsum dolor sit amet consectetur. Eu diam gravida eu
            adipiscing nulla in.
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={globalStyles.primaryInput}>
            <AntDesign
              name="user"
              size={20}
              style={globalStyles.primaryInputIcon}
            />
            <TextInput
              style={globalStyles.primaryTextInput}
              placeholder={"Email"}
              placeholderTextColor={globalStyles.secondaryGrey}
              onChangeText={(email) => setEmail(email)}
              value={email}
            />
          </View>
        </View>
      </View>
      <View style={styles.botWrapper}>
        <TouchableOpacity style={globalStyles.primaryGreenBtn}>
          <Text style={globalStyles.primaryBtnText}>Återställ lösenord</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.secondaryGreyBtn}
          onPress={navigateBack}
        >
          <Text style={globalStyles.secondaryBtnText}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NewPasswordView;

const styles = StyleSheet.create({
  midWrapper: {
    flex: 5,
  },

  inputWrapper: {
    marginTop: 60,
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  botWrapper: {
    flex: 2,
    alignItems: "center",
  },
});
