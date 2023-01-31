import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth } from 'firebase/auth'
import { useNavigation } from "@react-navigation/native";
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
    <SafeAreaView>
      <Text onPress={logout}>Logga ut</Text>
    </SafeAreaView>
  )
}

export default UserSettingsView

const styles = StyleSheet.create({})