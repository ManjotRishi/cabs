import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type BookRideStackParamList = {
  BookRideHome: undefined;
  RideListing: undefined;
  RideDetails: { rideId: string };
  BookingConfirm: { rideId: string };
};

export type MyRidesStackParamList = {
  MyRidesHome: undefined;
  MyRideDetails: { rideId: string };
};

export type PublishRideStackParamList = {
  PublishRideHome: undefined;
  PublishSuccess: undefined;
};

export type AccountStackParamList = {
  AccountHome: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type TabParamList = {
  BookRideTab: NavigatorScreenParams<BookRideStackParamList>;
  MyRidesTab: NavigatorScreenParams<MyRidesStackParamList>;
  PublishRideTab: NavigatorScreenParams<PublishRideStackParamList>;
  AccountTab: NavigatorScreenParams<AccountStackParamList>;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<TabParamList>;
};
