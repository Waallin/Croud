import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBar from "react-native-dynamic-search-bar";
import { globalStyles } from "../../../Styles/global";
const SearchbarComponent = ({ orgs, setFilteredOrgs, setInput }) => {
  function filterOrgs(text) {
    setFilteredOrgs(orgs);
    const result = orgs.filter((word) => word.Name.includes(text));
    setFilteredOrgs(result);
    text ? setInput(true) : setInput(false)
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Sök förening"
        placeholderTextColor={globalStyles.primaryGrey}
        onClearPress={(text) => filterOrgs("")}
        onChangeText={(text) => filterOrgs(text)}
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
    borderRadius: 10,
    backgroundColor: globalStyles.inputGrey,
    shadowRadius: 0, 
    shadowOpacity: 0
  },
});
