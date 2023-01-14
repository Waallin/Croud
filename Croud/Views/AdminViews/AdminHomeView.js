import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useRef } from "react";
import { database } from "../../Firebase/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import EventComponent from "./Components/EventComponent";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import moment from "moment"; // 2.20.1
import { uuidv4 } from "@firebase/util";

//firebase
import { doc, setDoc } from "firebase/firestore";

const AdminHomeView = ({ orgData }) => {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [sessionData, setSessionData] = useState();

  useEffect(() => {
    setSessionData(orgData);
    data();
  }, []);

  //Gather all info
  const [opponent, setOpponent] = useState();
  const [location, setLocation] = useState();
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [day, setDay] = useState();
  async function data() {
    const q = query(
      collection(database, "Games"),
      where("orgName", "==", "Admin")
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
        location: doc.data().location,
      };
      x.push(obj);
    });
    setEvents(x);
  }

  /*Bottom-Modal*/

  //function to push data to firebase
  async function pushData() {
    // Add a new document in collection "cities"
    await setDoc(doc(database, "Games", uuidv4()), {
      active: false,
      orgName: sessionData.OrgData,
      opponent: opponent,
      location: location,
      day: day,
      time: hour + '.' + min
    });  
  }

  /*calendar*/
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["85%"];
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }
  const format = "YYYY-MM-DD";
  const today = moment().format(format);
  function onDaySelect(day) {
    setDay(today);
    const datepicked = moment(day.dateString).format(format);
    setSelectedDay({ [datepicked]: { selected: true } });
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
                location={event.location}
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
          backgroundStyle={{ borderRadius: 30, backgroundColor: "#e1e1e1" }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTopWrapper}>
                <TouchableOpacity onPress={(() => console.log(events))}>
                  <Text style={styles.modalExitBtn}>Avbryt</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Ny Aktivitet</Text>
                <TouchableOpacity onPress={pushData}>
                  <Text style={styles.modalAddBtn}>Lägg till</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalMidWrapper}>
                <View style={styles.modalinputsOne}>
                  <TextInput
                    style={styles.input1}
                    onChangeText={(opponent) => setOpponent(opponent)}
                    value={opponent}
                    placeholder="Motståndare"
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder="Plats"
                    onChangeText={(location) => setLocation(location)}
                    value={location}
                  />
                  <View style={styles.timeWrapper}>
                    <TextInput
                      style={styles.hourInput}
                      maxLength={2}
                      placeholder="16"
                      numeric
                      keyboardType={"numeric"}
                      onChangeText={(hour) => setHour(hour)}
                      value={hour}
                    />
                    <TextInput
                      style={styles.minInput}
                      maxLength={2}
                      placeholder="00"
                      maxValue={24}
                      numeric
                      keyboardType={"numeric"}
                      onChangeText={(min) => setMin(min)}
                      value={min}
                    />
                  </View>
                </View>
                <View style={styles.modalinputsTwo}>
                  <View style={styles.calendarWrapper}>
                    <Calendar
                      style={styles.calendar}
                      theme={{
                        dotColor: "black",
                        selectedColor: "#0891B2",
                      }}
                      // we use moment.js to give the minimum and maximum dates.
                      minDate={today}
                      onDayPress={onDaySelect}
                      markedDates={selectedDay}
                    />
                  </View>
                </View>
                <View style={styles.modalinputsThree}></View>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    fontWeight: "400",
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
    fontWeight: "400",
    width: "80%",
    paddingLeft: 15,
    borderTopWidth: 0.4,
    borderColor: "#b1b1b1",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  modalinputsTwo: {
    alignItems: "center",
    marginTop: 20,
  },

  calendarWrapper: {
    width: "80%",
  },

  calendar: {
    borderRadius: 10,
    padding: 10,
  },

  //timepicker
  timeWrapper: {
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  hourInput: {
    backgroundColor: "white",
    height: 40,
    width: 80,
    textAlign: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  minInput: {
    backgroundColor: "white",
    borderLeftWidth: 0.4,
    borderColor: "grey",
    height: 40,
    width: 80,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    textAlign: "center",
  },
});
