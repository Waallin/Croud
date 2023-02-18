import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth } from 'firebase/auth'
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from '../../Styles/global';
const UserSettingsView = () => {
    const navigate = useNavigation();
    async function logout() {
        const auth = getAuth()

        auth.signOut().then(function() {
            // Sign-out successful.
            navigate.replace("login")
          }, function(error) {
            // An error happened.
          });
    }
  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <Text style={globalStyles.primaryTitle}>Inställningar</Text>
      </View>
      <View style={{alignItems: "center"}}>
        <TouchableOpacity
          onPress={logout}
          style={globalStyles.secondaryGreyBtn}
        >
          <Text style={globalStyles.secondaryBtnText}>logga ut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default UserSettingsView

const styles = StyleSheet.create({})