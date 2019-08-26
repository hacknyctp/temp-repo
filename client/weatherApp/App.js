import React from 'react';
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Schedule from "./pages/Schedule";
import WelcomePage from "./pages/WelcomePage";
import UserWeather from './pages/UserWeather.js'
import RainPreference from "./pages/RainPreference";
import HumidityPreference from "./pages/HumidityPreference";
import { createStackNavigator, createAppContainer } from "react-navigation";

const App = () => {
  return (
    <WelcomePage />
  );
};

//this is the navigators history 
const AppNavigator = createStackNavigator({
  Home: WelcomePage,
  Login: Login,
  SignUp: Signup,
  Schedule: Schedule,
  RainPreference: RainPreference,
  HumidityPreference: HumidityPreference,
  UserWeather: UserWeather
}, {
    initialRouteName: "UserWeather",
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default createAppContainer(AppNavigator);
