import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateEventView from "./CreateEventView";
import React, { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../Firebase/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import EventComponent from "./Components/EventComponent";
import { Ionicons } from '@expo/vector-icons'; 

const AdminHomeView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    data();
  }, []);

  async function data() {
    const q = query(
      collection(database, "Games"),
      where("orgName", "==", "Admin Ik")
    );

    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      let obj = {
        id: doc.id,
        opponent: doc.data().opponent,
        time: doc.data().time,
        day: doc.data().day,
        place: doc.data().Place
      };
      x.push(obj);
    });
    setEvents(x);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>Evenemang</Text>
        <TouchableOpacity style={styles.addIcon}>
        <Ionicons name="add-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.botWrapper}>
        <View>
          {events.map((event) => {
            return (
              <EventComponent
                opponent={event.opponent}
                time={event.time}
                day={event.day}
                place={event.place}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminHomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topWrapper: {
    flex: 0.15,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "lightgrey",
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "space-between",

  },

  addIcon: {
    marginRight: 30
  },

  title: {
    fontSize: "40px",
    paddingBottom: 15,
    fontWeight: "700",
  },

  botWrapper: {
    flex: 1,
  },
});
