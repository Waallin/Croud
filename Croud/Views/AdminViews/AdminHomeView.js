import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
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
import EventComponent from "./AdminComponents/EventComponent";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment"; // 2.20.1
import { uuidv4 } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

//firebase
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { globalStyles } from "../../Styles/global";

const AdminHomeView = ({ orgData, route }) => {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const navigate = useNavigation();
  useEffect(() => {
    //get data from firebase
    data();
  }, [route]);

  //Gather all info
  const [opponent, setOpponent] = useState();
  const [location, setLocation] = useState();
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [day, setDay] = useState();

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(true);

  async function data() {
    console.log(route.params);
    const q = query(
      collection(database, "Games"),
      where("Hometeam", "==", route.params.orgData.Name)
    );
    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      let obj = {
        key: doc.id,
        Active: doc.data().Active,
        Opponent: doc.data().Opponent,
        Hometeam: doc.data().Hometeam,
        Time: doc.data().Time,
        Day: doc.data().Day,
        Location: doc.data().Location,
      };
      x.push(obj);
    });

    //filter on dates
    let dateFilter = x.sort(function (a, b) {
      return new Date(a.Day) - new Date(b.Day);
    });
    setEvents(dateFilter);
  }
  //Update db when scroll down
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      data();
    }, 2000);
  }, []);

  /*Bottom-Modal*/
  //function to push data to firebase
  async function pushData() {
    // Add a new document in collection

    await setDoc(doc(database, "Games", uuidv4()), {
      Active: false,
      Hometeam: orgData.Name,
      Opponent: opponent,
      Location: location,
      Day: day,
      Time: hour + "." + min,
      Sport: orgData.Sport,
    });

    //add to favourite or remove if we click again

    const ref = doc(database, "Organisations", orgData.Name);
    await updateDoc(ref, {
      Gamedays: arrayUnion(day),
    });

    closeModal();
  }

  let bottomSheetModalRef = useRef(null);
  const snapPoints = showCalendar || showTime ? ["85%"] : ["45"];
  function handlePresentModal() {
    setShowCalendar(false);
    setShowTime(false);
    bottomSheetModalRef.current?.present();
  }

  //close bottomsheetmodal
  function closeModal() {
    bottomSheetModalRef.current?.close();
  }
  const format = "YYYY-MM-DD";
  const today = moment().format(format);
  function onDaySelect(day) {
    const datepicked = moment(day.dateString).format(format);
    setSelectedDay({ [datepicked]: { selected: true } });
    setDay(datepicked);
  }

  function showCalendarFunction() {
    showTime ? setShowTime(!showTime) : null;
    setShowCalendar(!showCalendar);
  }

  function showTimeFunction() {
    showCalendar ? setShowCalendar(!showCalendar) : null;
    setShowTime(!showTime);
  }

  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={styles.topWrapper}>
        <Text style={globalStyles.primaryTitle}>Evenemang</Text>
        <TouchableOpacity onPress={handlePresentModal}>
          <Ionicons
            name="add-outline"
            size={32}
            color={globalStyles.primaryBlack}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {events.map((event) => {
            return (
              <EventComponent
                key={event.id}
                event={event}
                Opponent={event.Opponent}
                Hometeam={event.Hometeam}
                Time={event.Time}
                Day={event.Day}
                Location={event.Location}
              />
            );
          })}
        </View>
      </ScrollView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 30 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.bTopWrapper}>
                <Text style={globalStyles.primaryTitle}>
                  Lägg till evenemang
                </Text>
              </View>
              <View style={styles.bMidWrapper}>
                <View style={styles.inputWrapper}>
                  <Text style={globalStyles.darkerText}>Motståndare</Text>

                  <View style={globalStyles.primaryInput}>
                    <Ionicons
                      name="medal-outline"
                      size={20}
                      style={globalStyles.primaryInputIcon}
                    />
                    <TextInput
                      style={globalStyles.primaryTextInput}
                      placeholderTextColor={globalStyles.secondaryGrey}
                    />
                  </View>
                  <Text style={globalStyles.darkerText}>Plats</Text>
                  <View style={globalStyles.primaryInput}>
                    <MaterialIcons
                      name="place"
                      size={20}
                      style={globalStyles.primaryInputIcon}
                    />
                    <TextInput
                      style={globalStyles.primaryTextInput}
                      placeholderTextColor={globalStyles.secondaryGrey}
                    />
                  </View>
                  <View style={styles.dayWrapper}>
                    <View>
                      <Text style={globalStyles.darkerText}>Plats</Text>
                      <View style={globalStyles.secondaryInput}>
                        <AntDesign
                          name="calendar"
                          size={20}
                          style={globalStyles.primaryInputIcon}
                        />
                        <TextInput
                          style={globalStyles.primaryTextInput}
                          placeholder={"Välj datum"}
                          placeholderTextColor={globalStyles.secondaryGrey}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={globalStyles.darkerText}>Plats</Text>
                      <View style={globalStyles.secondaryInput}>
                        <AntDesign
                          name="clockcircleo"
                          size={20}
                          style={globalStyles.primaryInputIcon}
                        />
                        <TextInput
                          style={globalStyles.primaryTextInput}
                          placeholder={"Välj tid"}
                          placeholderTextColor={globalStyles.secondaryGrey}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={globalStyles.primaryGreenBtn}>
                <Text style={globalStyles.primaryBtnText}>Lägg till</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.bBotWrapper}>
                {showCalendar ? (
                  <Text style={styles.titleText}>kalender</Text>
                ) : (
                  ""
                )}
                {showTime ? <Text style={styles.titleText}>tid</Text> : ""}
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
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bTopWrapper: {
    alignItems: "center",
    height: "10%",

  },

  inputWrapper: {
    padding: 10
  },

  bMidWrapper: {
    alignItems: "center",
    height: "90%",
    justifyContent: "space-around"
  },

  dayWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

/*

      <View style={styles.topWrapper}>
        <Text style={globalStyles.primaryTitle}>Evenemang</Text>
        <TouchableOpacity onPress={handlePresentModal}>
          <Ionicons name="add-outline" size={32} color={globalStyles.primaryBlack} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.botWrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {events.map((event) => {
            return (
              <EventComponent
                key={event.id}
                event={event}
                Opponent={event.Opponent}
                Hometeam={event.Hometeam}
                Time={event.Time}
                Day={event.Day}
                Location={event.Location}
              />
            );
          })}
        </View>
      </ScrollView>
      {/*Bottom-Modal}
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
                <TouchableOpacity onPress={closeModal}>
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
                    placeholder="Motståndare"
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder="Plats"
                    onChangeText={(location) => setLocation(location)}
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

*/
