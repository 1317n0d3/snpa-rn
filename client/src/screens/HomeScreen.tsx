import { ColorsEnum } from "constants/Colors";
import { AuthContext, useAuth } from "providers/AuthProvider";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";


const HomeScreen = () => {
  const {userData} = useAuth()
  const {first_name, last_name, date_of_birth, photo_uri} = userData
  const textFields = [first_name, last_name, date_of_birth]

  if (!userData) {
    return <Text style={styles.text}>...Loading</Text>
  }

  return (
    <View style={styles.container}>
      {textFields.map((textField, idx) => {
        return (
          <Text key={idx} style={styles.text}>{textField}</Text>
        )
      })}
      <Image source={{uri: photo_uri}} style={{width: 300, height: 300}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "column-reverse"
  },
  text: {
    margin: 7,
    color: ColorsEnum.black,
    fontWeight: '600',
    fontSize: 16,
  }
})

export default HomeScreen