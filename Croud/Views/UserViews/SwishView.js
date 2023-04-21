import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalStyles } from '../../Styles/global'
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'; 
const SwishView = ({route}) => {
    const navigate = useNavigation();
    const gameInfo = route.params.game;
    const userInfo = route.params.user;

    function nav() {
        navigate.navigate("IngameView",{
          game: gameInfo,
          user: userInfo,
          newTicket: true
        });
    }
  return (
    <View style={{flex: 1, backgroundColor: "white"}}> 
    <View style={{flex: 1, backgroundColor: globalStyles.primaryGreen, justifyContent: "center", alignItems: "center", borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
    <Feather name="check-circle" size={62} color="white" />
    <Text style={{fontSize: "32px", color: "white", marginTop: 25}}>Din betalning lyckades!</Text>
    </View>
    <View style={{flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center"}}>
      <Text style={{color:"#B7B9BA", fontSize: "20px", fontWeight: "600", marginBottom: 10}}>23 Juli 2021 10:22</Text>
      <Text style={{color:"#B7B9BA", fontSize: "27px", fontWeight: "700", marginBottom: 10}}>Håsta IBK</Text>
      <Text style={{color:"#B7B9BA", fontSize: "20px", fontWeight: "600", marginBottom: 10}}>072 211 82 15</Text>
      <Text style={{color:"#B9B9BA", fontSize: "27px", fontWeight: "600", marginBottom: 50}}>200 kr</Text>
      <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={nav}>
      <Text style={globalStyles.primaryBtnText}>Fortsätt</Text>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default SwishView