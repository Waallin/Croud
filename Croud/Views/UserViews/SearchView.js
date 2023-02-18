import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrgComponent from "./UserComponents/OrgComponent";
import { database } from "../../Firebase/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import SearchbarComponent from "./UserComponents/SearchbarComponent";
import { globalStyles } from "../../Styles/global";

const SearchView = ({ userData, activeTab }) => {
  const [orgs, setOrgs] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);

  useEffect(() => {
    data();
  }, [activeTab]);

  async function data() {
    const q = query(collection(database, "Organisations"));
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
    });
    setOrgs(x);
    setFilteredOrgs(x);
  }
  return (
    <SafeAreaView edges={["top"]} style={globalStyles.primaryContainer}>
      <View style={globalStyles.primaryTopWrapper}>
        <Text style={globalStyles.primaryTitle}>Sök</Text>
      </View>
      <SearchbarComponent
        orgs={orgs}
        setOrgs={setOrgs}
        setFilteredOrgs={setFilteredOrgs}
      />
      <ScrollView>
        {filteredOrgs.map((org) => {
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
  );
};
export default SearchView;

const styles = StyleSheet.create({});
