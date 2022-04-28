import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "components/TabBarIcon";
import { AuthContext } from "providers/authProvider";
import { useContext } from "react";
import * as React from "react";
import HomeScreen from "screens/HomeScreen";
import MusicPlayerScreen from "screens/MusicPlayerScreen";
import SettingsScreen from "screens/SettingsScreen";
import { RootBottomTabParamList, RootTabScreenProps } from "types";

export enum AuthenticatedUserNavigatorScreensEnum {
  Home = 'Home',
  MusicPlayer = 'MusicPlayer',
  Settings = 'Settings',
}

export type AuthenticatedUserNavigatorTabParamList = {
  [key in keyof typeof AuthenticatedUserNavigatorScreensEnum]: undefined
}

const {Home, MusicPlayer, Settings} = AuthenticatedUserNavigatorScreensEnum

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

const AuthenticatedUserNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={Home}
    >
      <BottomTab.Screen
        name={Home}
        component={HomeScreen}
        options={({navigation}: RootTabScreenProps<typeof Home>) => ({
          title: Home,
          tabBarIcon: ({color}) => <TabBarIcon name="user" color={color}/>,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({pressed}) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <FontAwesome
          //       name="gear"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{marginRight: 15}}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name={MusicPlayer}
        component={MusicPlayerScreen}
        options={{
          title: MusicPlayer,
          tabBarIcon: ({color}) => <TabBarIcon name="music" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name={Settings}
        component={SettingsScreen}
        options={{
          title: Settings,
          tabBarIcon: ({color}) => <TabBarIcon name="gear" color={color}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default AuthenticatedUserNavigator;