import {
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  View
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { database } from "../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import FavouritesComponent from "./UserComponents/FavouritesComponent";
import OrgComponent from "./UserComponents/OrgComponent";
import { globalStyles } from "../../Styles/global";
const FavouritesView = ({ userData }) => {

  const [favTeams, setFavTeams] = useState([]);
  //Update db when scroll down
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {

    //get data from firebase
    getData();
  }, []);

  //get all favteams and putting them in state 'favTeams'
  async function getData() {
    const docRef = doc(database, "Users", userData.userData.Email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setFavTeams(docSnap.data().Favourites);
    } else {
      // doc.data() will be undefined in this case
      console.log("error");
    }
  }

  //refresh page when scroll down
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      console.log(favTeams)
      setRefreshing(false);
      getData();
    }, 2000);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <Text style={globalStyles.primaryTitle}>
          Favoriter
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {favTeams.map((team) => {
          return <OrgComponent key={team} Name={team} userData={userData}/>;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouritesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
