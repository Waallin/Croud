import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";

const SearchbarComponent = ({orgs, setOrgs, setFilteredOrgs}) => {


    function filterOrgs(text) {

        setFilteredOrgs(orgs)
        const result = orgs.filter(word => word.Name.includes(text));
        setFilteredOrgs(result)
        console.log(result)
    }
    
  return (
    <View style={styles.container}>
      <SearchBar
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        placeholder="Sök förening"
        cancelIconColor="#c6c6c6"
        onClearPress={(text => filterOrgs(""))}
        onChangeText={(text => filterOrgs(text))}
        
        style={styles.s}
      />
    </View>
  );
};

export default SearchbarComponent;

const styles = StyleSheet.create({


    s: {
    width: "100%",
    height: 50,
    borderRadius: 0
    }
});
