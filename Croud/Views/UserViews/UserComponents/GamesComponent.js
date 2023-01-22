import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";


const GamesComponent = ({opponent, time, day, location, id}) => {

  const navigate = useNavigation();


  function goToTicketView() {

    
    navigate.navigate("TicketView", {
      id: id
     });   
  }

  return (
    <TouchableOpacity style={styles.container} onPress={goToTicketView}>
      <Text style={styles.t}>{opponent}</Text>
      <Text style={styles.t}>{day}</Text>
      <Text style={styles.t}>{time}</Text>
      <Text style={styles.t}>{location}</Text>
    </TouchableOpacity>
  )
}

export default GamesComponent

const styles = StyleSheet.create({

    container: {
        flex: 1,
        borderWidth: 0.3,
        padding: 10,
        alignItems: "center",
    },

    t: {
        color: "black",
        fontSize: "20px"

    }
})