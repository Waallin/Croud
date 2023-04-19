import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalStyles } from '../../Styles/global'
import { useNavigation } from "@react-navigation/native";

const SwishView = ({route}) => {
    const navigate = useNavigation();
    const gameInfo = route.params.game;
    const userInfo = route.params.user;

    function nav() {
        navigate.navigate("Ingame",{
          game: gameInfo,
          user: userInfo
        });
    }
  return (
    <View style={{flex: 1, width: "100%", justifyContent: "center", alignItems: "center"}}>
      <Text>Klicka för att godkänna en swish</Text>
      <TouchableOpacity style={{...globalStyles.primaryGreenBtn, marginTop: 20}} onPress={nav}>
        <Text style={globalStyles.primaryBtnText}>Godkän</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SwishView