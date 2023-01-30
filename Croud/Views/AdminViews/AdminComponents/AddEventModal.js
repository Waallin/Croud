import { View, StyleSheet, Modal } from "react-native";
import React from "react";


import React from "react";

const AddEventModal = () => {
  // ref

  return (
    <Modal
      animated
      animationType="fade"
      visible={this.props.visible}
      transparent
      onRequestClose={() => this._handleDismiss()}
    >
      <View style={styles.overlay}>...</View>
    </Modal>
  );
};

export default AddEventModal;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
});
