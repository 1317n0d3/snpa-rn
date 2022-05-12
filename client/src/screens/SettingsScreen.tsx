import InputFieldList from "components/InputFieldList";
import { ColorsEnum } from "constants/Colors";
import { useApi, UserDataType } from "hooks/useApi";
import { useAuth } from "providers/AuthProvider";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { HandleFieldChangeType } from "types";
import { getImageUri } from "utils/getImageUri";
import * as ImagePicker from 'expo-image-picker';


const SettingsScreen = () => {
  const {updateUserData} = useApi()
  const {userData: {password, photo_uri, id}} = useAuth()

  const [formData, setFormData] = useState<Pick<UserDataType, 'photo_uri'> &
    { newPassword: string; newPasswordConfirm: string }>({
    newPassword: "",
    newPasswordConfirm: "",
    photo_uri: ""
  })

  const fields: { placeholder: string, key: keyof typeof formData }[] = [
    {
      placeholder: 'Новый пароль',
      key: 'newPassword'
    },
    {
      placeholder: 'Повторите новый пароль',
      key: 'newPasswordConfirm'
    },
  ]

  const handleFieldChange: HandleFieldChangeType<typeof formData> = (fieldKey, newValue) => {
    setFormData({...formData, [fieldKey]: newValue})
  }

  const handleLoadPhotoBtn = async () => {
    handleFieldChange('photo_uri', await getImageUri());
  }
  const isAllowedToChangePassword = formData['newPassword'] === formData['newPasswordConfirm'] &&
    formData["newPassword"] !== '' && formData['newPasswordConfirm'] !== ''

  const handleChangePasswordBtn = () => {
    if (isAllowedToChangePassword) updateUserData({password: formData['newPasswordConfirm']}, id)
  }

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      handleFieldChange('photo_uri', result.uri);
      console.log(result.uri);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.imgContainer} onPress={handleLoadPhotoBtn}>
        <Image
          source={{uri: formData['photo_uri'] || photo_uri}}
          style={{width: 200, height: 200}}
        />
      </Pressable>
      <Pressable
        style={[
          styles.confirmPassBtn,
          {backgroundColor: '#a1ceff'}
        ]}
        onPress={openCamera}
      >
        <Text style={styles.text}>Сделать фото</Text>
      </Pressable>
      <View style={styles.passwordContainer}>
        <InputFieldList
          fieldStyles={styles.input}
          fields={fields.map(field => ({...field, value: formData[field.key]}))}
          handleFieldChange={handleFieldChange}
        />
        <Pressable
          style={[
            styles.confirmPassBtn,
            {backgroundColor: isAllowedToChangePassword ? '#a1ceff' : 'gray'}
          ]}
          disabled={!isAllowedToChangePassword}
          onPress={handleChangePasswordBtn}
        >
          <Text style={styles.text}>Сменить пароль</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  passwordContainer: {
    margin: 7,
    width: '80%',
  },
  imgContainer: {
    margin: 30,
  },
  input: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: ColorsEnum.black,
    marginVertical: 20,
    fontSize: 16,
    color: ColorsEnum.black,
    borderRadius: 5
  },
  confirmPassBtn: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a1ceff',
    borderRadius: 5
  },
  text: {
    color: ColorsEnum.white,
    fontSize: 16,
    padding: 9,
  }
})

export default SettingsScreen