import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrgComponent from './UserComponents/OrgComponent'
import { database } from '../../Firebase/firebase'
import { collection, query, getDocs } from 'firebase/firestore'

const SearchView = ( { userData } ) => {

  const [activeTab, setActiveTab] = useState('searchView');

const [orgs, setOrgs] = useState([]);

useEffect(() => {
  data();
  console.log("hej från sökview")
}, [activeTab])


  async function data() {
    const q = query(
      collection(database, "Organisations"),
    );
    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      let obj = {
        Address: doc.data().Address,
        City: doc.data().City,
        Name: doc.data().Name,
        Place: doc.data().Place,
        Sport: doc.data().Sport,
        Swish: doc.data().Swish,
        ZipCode: doc.data().ZipCode,
      };
      x.push(obj);
    })
    setOrgs(x);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>Sök</Text>
      </View>
      <ScrollView style={styles.botWrapper}>
      {orgs.map((org) => {
            return (
              <OrgComponent
              key={org.Name}
              Name={org.Name}
              Sport={org.Sport}
              org={org}
              userData={userData}
              />
              );
            })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchView

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

  title: {
    fontSize: "40px",
    paddingBottom: 15,
    fontWeight: "700",
  },

  botWrapper: {
    flex: 1,
  },
})