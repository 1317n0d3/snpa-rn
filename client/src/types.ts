import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticatedUserNavigatorTabParamList } from "navigation/AuthenticatedUserNavigator";
import { UnauthenticatedUserNavigatorTabParamList } from "navigation/UnauthenticatedUserNavigator";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
    }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootBottomTabParamList>;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList,
  Screen>;

export type RootBottomTabParamList = UnauthenticatedUserNavigatorTabParamList & AuthenticatedUserNavigatorTabParamList

export type RootTabScreenProps<Screen extends keyof RootBottomTabParamList> =
  CompositeScreenProps<BottomTabScreenProps<RootBottomTabParamList,
    Screen>,
    NativeStackScreenProps<RootStackParamList>>;


export type FormDataType = { [key: string]: string }

export type HandleFieldChangeType<FormData> = (fieldKey: keyof FormData, newValue: string) => void