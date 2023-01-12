import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
const ScanView = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("not yet scanned");

  const askCameraPermission = () => {
    (async() => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })()
  }

  useEffect(() => {
    askCameraPermission();
  }, [])


  //what happen when we scan barcode

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log("type " + type + " data " + data);
  }

  //check permission and return the screen

  if (hasPermission == null) {
    return(
      <Text>requesting for camera permission</Text>
    )
  }

  if (hasPermission == false)
  {
    return (
      <View>
      <Text>no access</Text>
      <TouchableOpacity onPress={(() =>  askCameraPermission())}>
        <Text>allow camera</Text>
      </TouchableOpacity>
      </View>
    )
  }



  return (
    <View style={styles.container}>
      <BarCodeScanner 
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{height: 400, width: 400 }}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default ScanView

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: '30px'
  }
})