import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Switch,
  StatusBar,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateEventView from "./CreateEventView";
import React, { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../Firebase/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import EventComponent from "./Components/EventComponent";
import { Ionicons } from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";
import { Calendar } from "react-native-calendars";

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
        place: doc.data().Place,
      };
      x.push(obj);
    });
    setEvents(x);
  }

  /*Bottom-Modal*/
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["85%"];
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>Evenemang</Text>
        <TouchableOpacity style={styles.addIcon} onPress={handlePresentModal}>
          <Ionicons name="add-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.botWrapper}>
        <View>
          {events.map((event) => {
            return (
              <EventComponent
                key={event.id}
                opponent={event.opponent}
                time={event.time}
                day={event.day}
                place={event.place}
              />
            );
          })}
        </View>
      </ScrollView>

      {/*Bottom-Modal*/}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 30, backgroundColor: "lightgrey" }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalTopWrapper}>
              <TouchableOpacity>
                <Text style={styles.modalExitBtn}>Avbryt</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Ny Aktivitet</Text>
              <TouchableOpacity>
                <Text style={styles.modalAddBtn}>Lägg till</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalMidWrapper}>
              <View style={styles.modalinputsOne}>
                <TextInput style={styles.input1} placeholder="Motståndare" />
                <TextInput style={styles.input2} placeholder="Plats" />
              </View>
              <View style={styles.modalinputsTwo}>
                <View style={styles.calendar}>
                  <Calendar style={{ borderRadius: 10 }} />
                </View>
              </View>
              <View style={styles.modalinputsThree}></View>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
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
    marginRight: 30,
  },

  title: {
    fontSize: "40px",
    paddingBottom: 15,
    fontWeight: "700",
  },

  botWrapper: {
    flex: 1,
  },

  /*Bottom-Modal*/
  modalContainer: {
    flex: 1,
  },

  modalTopWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  modalTitle: {
    fontSize: "20px",
    fontWeight: "600",
  },

  modalExitBtn: {
    fontSize: "15px",
    color: "red",
    textDecorationLine: "underline",
  },

  modalAddBtn: {
    fontSize: "15px",
    color: "blue",
    textDecorationLine: "underline",
  },

  modalMidWrapper: {
    flex: 1,
  },

  modalinputsOne: {
    alignItems: "center",
    marginTop: 20,
  },
  input1: {
    backgroundColor: "white",
    fontSize: "15px",
    fontWeight: "600",
    height: 40,
    width: "80%",
    paddingLeft: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  input2: {
    backgroundColor: "white",
    height: 40,
    fontSize: "15px",
    fontWeight: "600",
    width: "80%",
    paddingLeft: 15,
    borderTopWidth: 0.4,
    borderColor: "#b1b1b1",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  modalinputsTwo: {
    alignItems: "center",
    marginTop: 40,
  },

  calendar: {
    width: "80%",
  },
});
