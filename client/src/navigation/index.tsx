import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApi } from "hooks/useApi";
import AuthenticatedUserNavigator from "navigation/AuthenticatedUserNavigator";
import LinkingConfiguration from 'navigation/LinkingConfiguration';
import UnauthenticatedUserNavigator from "navigation/UnauthenticatedUserNavigator";
import { AuthContext, useAuth } from "providers/AuthProvider";
import { useContext } from "react";
import * as React from "react";
import { ColorSchemeName } from 'react-native';
import ModalScreen from 'screens/ModalScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import { RootStackParamList } from 'types';

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const {Navigator, Screen, Group} = Stack;

function RootNavigator() {
  const {checkAuth} = useApi()
  const {isAuthed} = useAuth()

  return (
    <Navigator>
      <Screen
        name="Root"
        component={isAuthed ? AuthenticatedUserNavigator : UnauthenticatedUserNavigator}
        options={{headerShown: false}}/>
      <Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
      <Group screenOptions={{presentation: 'modal'}}>
        <Screen name="Modal" component={ModalScreen}/>
      </Group>
    </Navigator>
  )
}


