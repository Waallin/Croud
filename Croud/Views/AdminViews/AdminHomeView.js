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
import WheelPicker from "react-native-wheely";
import { Picker, DatePicker } from "react-native-wheel-pick";
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
  const [hour, setHour] = useState("16");
  const [min, setMin] = useState("30");
  const [day, setDay] = useState();

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(true);

  const [selectedTime, setSelectedTime] = useState(0);

  async function data() {
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
        Text: doc.data().Text,
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
  const snapPoints = showCalendar || showTime ? ["85%"] : ["80"];
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
    setShowCalendar(!showCalendar);

    const datepicked = moment(day.dateString).format(format);
    setSelectedDay({ [datepicked]: { selected: true } });
    setDay(datepicked);
  }

  function showCalendarFunction() {
    Keyboard.dismiss();
    showTime ? setShowTime(!showTime) : null;
    setShowCalendar(!showCalendar);
  }

  function showTimeFunction() {
    showCalendar ? setShowCalendar(!showCalendar) : null;
    setShowTime(!showTime);
  }

  function addTime() {
    let time = hour + "." + min;
    setSelectedTime(time)
    setShowTime(!showTime)
  }

  return (
    <SafeAreaView style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
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
                key={event.key}
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
                      onChangeText={(opponent) => setOpponent(opponent)}
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
                      onChangeText={(location) => setLocation(location)}
                    />
                  </View>
                  <View style={styles.dayWrapper}>
                    <View>
                      <Text style={globalStyles.darkerText}>Plats</Text>
                      <TouchableOpacity
                        style={globalStyles.secondaryInput}
                        onPress={showCalendarFunction}
                      >
                        <AntDesign
                          name="calendar"
                          size={20}
                          style={globalStyles.primaryInputIcon}
                        />
                        <Text
                          style={{
                            ...globalStyles.primaryText,
                            paddingHorizontal: 5,
                          }}
                        >
                          {day ? day : "Välj dag"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={showTimeFunction}>
                      <Text style={globalStyles.darkerText}>Plats</Text>
                      <View style={globalStyles.secondaryInput}>
                        <AntDesign
                          name="clockcircleo"
                          size={20}
                          style={globalStyles.primaryInputIcon}
                        />
                        <Text
                          style={{
                            ...globalStyles.primaryText,
                            paddingHorizontal: 5,
                          }}
                        >
                          {selectedTime ? selectedTime : "Välj tid"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {showCalendar ? (
                  <Calendar
                    theme={{
                      dotColor:  "#e8e8e8",
                      selectedColor:  "#e8e8e8",
                    }}
                    // we use moment.js to give the minimum and maximum dates.
                    minDate={today}
                    onDayPress={onDaySelect}
                    markedDates={selectedDay}
                  />
                ) : null}
                {showTime ? (
                  <View style={{alignItems: "center"}}>
                    <View style={styles.timeWrapper}>
                      <Picker
                        style={{
                          backgroundColor: "white",
                          width: 100,
                          height: 215,
                        }}
                        selectedValue={"16"}
                        pickerData={[
                          "06",
                          "07",
                          "08",
                          "09",
                          "10",
                          "11",
                          "12",
                          "13",
                          "14",
                          "15",
                          "16",
                          "17",
                          "18",
                          "19",
                          "20",
                          "21",
                          "22",
                        ]}
                        onValueChange={(value) => {setHour(value)}}
                        itemSpace={30} // this only support in android
                      />

                      <Picker
                        style={{
                          backgroundColor: "white",
                          width: 100,
                          height: 215,
                        }}
                        selectedValue={"30"}
                        pickerData={[
                          "00",
                          "05",
                          "10",
                          "15",
                          "20",
                          "25",
                          "30",
                          "35",
                          "40",
                          "45",
                          "50",
                          "55",
                        ]}
                        onValueChange={(value) => {setMin(value)}}
                        itemSpace={30} // this only support in android
                      />
                    </View>
                    <TouchableOpacity style={{...globalStyles.secondaryGreenBtn, marginTop: 20}} onPress={addTime}>
                      <Text style={globalStyles.primaryBtnText}>Lägg till</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {showTime || showCalendar ? null : (
                  <TouchableOpacity style={globalStyles.primaryGreenBtn} onPress={pushData}>
                    <Text style={globalStyles.primaryBtnText}>Lägg till</Text>
                  </TouchableOpacity>
                )}
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


  bTopWrapper: {
    alignItems: "center",
    height: "10%",
  },

  inputWrapper: {
    padding: 10,
  },

  bMidWrapper: {
    alignItems: "center",
    marginTop: 0,
    height: "85%",
    justifyContent: "space-around",
  },

  dayWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  timeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

