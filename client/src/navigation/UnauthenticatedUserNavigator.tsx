import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "components/TabBarIcon";
import Colors from "constants/Colors";
import useColorScheme from "hooks/useColorScheme";
import * as React from "react";
import { Pressable } from "react-native";
import LogInScreen from "screens/LogInScreen";
import SignUpScreen from "screens/SignUpScreen";
import { RootBottomTabParamList, RootTabScreenProps } from "types";

export enum UnauthenticatedUserNavigatorScreensEnum {
  LogIn = 'LogIn',
  SignUp = 'SignUp'
}

export type UnauthenticatedUserNavigatorTabParamList = {
  [key in keyof typeof UnauthenticatedUserNavigatorScreensEnum]: undefined
}

const {LogIn, SignUp} = UnauthenticatedUserNavigatorScreensEnum

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

const UnauthenticatedUserNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName={LogIn}
    >
      <BottomTab.Screen
        name={LogIn}
        component={LogInScreen}
        options={({navigation}: RootTabScreenProps<typeof LogIn>) => ({
          title: LogIn,
          tabBarIcon: ({color}) => <TabBarIcon name="user" color={color}/>,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{marginRight: 15}}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name={SignUp}
        component={SignUpScreen}
        options={{
          title: SignUp,
          tabBarIcon: ({color}) => <TabBarIcon name="user-plus" color={color}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default UnauthenticatedUserNavigator;