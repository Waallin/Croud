import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
const QrCodeView = (route) => {


  function testing() {
    console.log(route.route.params.uuid)
  }


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={testing}>
      <QRCode
      value={route.route.params.uuid}
      size={100}
      color='black'
      backgroundColor='lightblue'
      />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default QrCodeView

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})