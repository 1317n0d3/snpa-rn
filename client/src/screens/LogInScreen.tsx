import InputFieldList from "components/InputFieldList";
import { ColorsEnum } from "constants/Colors";
import { LoginUserDataType, useApi, } from "hooks/useApi";
import { UnauthenticatedUserNavigatorScreensEnum } from "navigation/UnauthenticatedUserNavigator";
import { AuthContext, useAuth } from "providers/AuthProvider";
import { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text } from "react-native";
import { HandleFieldChangeType, RootTabScreenProps } from "types";

const LogInScreen = ({navigation}: RootTabScreenProps<UnauthenticatedUserNavigatorScreensEnum.LogIn>) => {
  const {login} = useApi()
  const {setUserData} = useAuth()

  const [formData, setFormData] = useState<LoginUserDataType>({
    login: "",
    password: ""
  })

  const fields: { placeholder: string, key: keyof typeof formData }[] = [
    {
      placeholder: 'Логин',
      key: 'login'
    },
    {
      placeholder: 'Пароль',
      key: 'password'
    },
  ]

  const handleFieldChange: HandleFieldChangeType<typeof formData> = (fieldKey, newValue) => {
    setFormData({...formData, [fieldKey]: newValue})
  }

  const handleLogInBtnPress = async () => {
    const userData = await login(formData)
    setUserData(userData)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <InputFieldList
        fieldStyles={styles.input}
        fields={fields.map(field => ({...field, value: formData[field.key]}))}
        handleFieldChange={handleFieldChange}
      />
      <Pressable style={styles.btn} onPress={handleLogInBtnPress}>
        <Text style={styles.btnText}>Войти</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    display: "flex",
    justifyContent: 'center',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: ColorsEnum.black,
    marginVertical: 20,
    fontSize: 18,
    color: ColorsEnum.black,
    borderRadius: 5
  },
  btn: {
    margin: 30,
    display: 'flex',
    alignItems: 'center',
    color: ColorsEnum.black,
    fontSize: 16,
    backgroundColor: '#a1ceff',
    borderRadius: 7,
  },
  btnText: {
    color: ColorsEnum.black,
    fontSize: 16,
    padding: 9,
  }
})

export default LogInScreen