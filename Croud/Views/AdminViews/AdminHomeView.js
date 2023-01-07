import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { useNavigation } from "@react-navigation/native";

const AdminHomeView = () => {

    const navigate = useNavigation();

  return (
    <View>
        <TouchableOpacity onPress={() => navigate.replace("login")}>
            <Text>tillbaka</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AdminHomeView

const styles = StyleSheet.create({})