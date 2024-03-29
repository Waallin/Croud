import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../../Styles/global";
import ActiveComponent from "./ActiveComponent";
import { database } from "../../../Firebase/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
const GamesComponent = ({
  opponent,
  time,
  day,
  location,
  hometeam,
  game,
  active,
  user,
}) => {
  const navigate = useNavigation();

  function dayText(a) {
    const currentDate = new Date();
    let today = currentDate.toISOString().split("T")[0];
    let tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    switch (a) {
      case today:
        return "Idag";
      case tomorrow:
        return "Imorgon";
      default:
        return a;
    }
  }

  async function goToTicketView() {

    const q = query(
      collection(database, "Users"),
      where("Email", "==", user.Email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let allTickets = doc.data().Tickets;


      const mappedTicket = allTickets ?  allTickets.map((obj) => obj.gameId) : [];

      console.log(game.id)
        
        if (mappedTicket.includes(game.id)) {
          navigate.navigate("IngameView", {
            game: game,
            active: active,
            user: user,
            ticket: true
          });
        } else {
          navigate.navigate("IngameView", {
            game: game,
            active: active,
            user: user,
            ticket: false
          });
        }

    });
  }

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={active ? goToTicketView : null}
    >
      <View style={styles.leftWrapper}>
        <Text style={styles.teamText}>
          {hometeam} - {opponent} {active ? <ActiveComponent /> : null}
        </Text>
        <Text style={globalStyles.primaryText}>{location}</Text>
      </View>
      <View style={styles.rightWrapper}>
        <Text style={globalStyles.primaryText}>{dayText(day)}</Text>
        <Text style={globalStyles.primaryText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GamesComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 10,
  },

  teamText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: "16px",
    paddingVertical: 3,
  },

  placeText: {
    fontFamily: "Manrope_500Medium",
    fontSize: "14px",
    paddingVertical: 3,
  },

  rightWrapper: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
