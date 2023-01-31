import { StyleSheet, Text, View, RefreshControl } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { database } from "../../Firebase/firebase";
import {Location, Permissions } from 'expo'
import OrgComponent from "./UserComponents/OrgComponent";
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import GamesComponent from "./UserComponents/GamesComponent";
import NearbyTeamsComponent from "./UserComponents/NearbyTeamsComponent";


const NearbyGamesView = (route) => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    getData();
    if (route.location) {
      getData();
    }
  }, [route.location]);


  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
      setRefreshing(false);
    }, 2000);
  }, []);

  //function from gpt to get the distance between two points with the Haversine-formel
    async function getData() {
    // const point1 = { latitude: location.coords.latitude, longitude: location.coords.longitude};
    ///////
    
   const nTeams = [];
    const q = query(collection(database, "Organisations"));
    const querySnapshot = await getDocs(q);
    let teams = [];
    querySnapshot.forEach((doc) => {
      let obj = {
        Address: doc.data().Address,
        City: doc.data().City,
        Name: doc.data().Name,
        Place: doc.data().Place,
        Sport: doc.data().Sport,
        Swish: doc.data().Swish,
        ZipCode: doc.data().ZipCode,
        Latitude: doc.data().Latitude,
        Longitude: doc.data().Longitude,
      };
      teams.push(obj);
    });
    /////////
    if (route != null) {
    teams.forEach((team) => {

      const R = 6371;
      const point1 = {
        //users coordinates

        //vallvägen: 
        latitude: 61.71954853271528,
        longitude: 17.09635300806849

        /*
        latitude: route.location.coords.latitude,
        longitude: route.location.coords.longitude
        */
      };
      const point2 = { latitude: team.Latitude, longitude: team.Longitude };
      const lat1 = point1.latitude;
      const lon1 = point1.longitude;
      const lat2 = point2.latitude;
      const lon2 = point2.longitude;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      //console.log(distance);
      if (distance < 50) {
        nTeams.push(team);
      }
    });
    setTeams(nTeams);
    console.log(nTeams)
  }
  }

  return (
    <View style={styles.container}> 
      <ScrollView
        style={styles.gamesContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {teams.map((org) => {
          return (
            <OrgComponent
            key={org.Name}
            Name={org.Name}
            Sport={org.Sport}
            org={org}
            userData={route.userData}
             />
          )
        })}
      </ScrollView>
    </View>
  );
};

export default NearbyGamesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey"
  },

  gamesContainer: {
    marginTop: 5
  }
});
