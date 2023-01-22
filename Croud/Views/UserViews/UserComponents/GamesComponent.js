import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons'; 


const GamesComponent = ({opponent, time, day, location, id, hometeam, game}) => {

  const navigate = useNavigation();


  function goToTicketView() {
    navigate.navigate("TicketView", {
      game: game
     });   
  }

  return (
    <View style={styles.container} onPress={goToTicketView}>

      <View style={styles.info}>
      <Text>{hometeam} - {opponent}</Text>
      <Text>{location}</Text>
      <Text>{day}</Text>
      <Text>{time}</Text>
      </View>
      <TouchableOpacity onPress={goToTicketView}>
      <FontAwesome name="ticket" size={42} color="#0891B2" style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

export default GamesComponent

const styles = StyleSheet.create({

    container: {
        flex: 1,
        borderWidth: 0.3,
        borderRadius: 10,
        marginVertical: 3,
        marginHorizontal: 10,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },

    icon: {
      marginRight: 15
    }
})