import React from 'react';
import { View } from 'react-native';
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Schedule from "./pages/Schedule.js";
import Dashboard from "./pages/Dashboard.js";
import WelcomePage from "./pages/WelcomePage.js";
import UserWeather from './pages/UserWeather.js'
import RainPreference from "./pages/RainPreference.js";
import HumidityPreference from "./pages/HumidityPreference.js";
import { createStackNavigator, createAppContainer } from "react-navigation";

const App = () => {
  return (
    <View style={{ backgroundColor: '#01404D', height: "100%" }}>
      <WelcomePage />
    </View>
  );
};

//this is the navigators history 
const AppNavigator = createStackNavigator({
  Home: WelcomePage,
  Login: Login,
  SignUp: Signup,
  UserWeather: UserWeather,
  Schedule: Schedule,
  RainPreference: RainPreference,
  HumidityPreference: HumidityPreference,
  Dashboard: Dashboard,

}, {
    initialRouteName: "Home",
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default createAppContainer(AppNavigator);
