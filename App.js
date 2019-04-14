import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';

import Connect from './android/app/components/connect';
import Home from './android/app/components/home';
import Login from './android/app/components/login';
import SignUp from './android/app/components/signup';
import Dashboard from './android/app/components/dashboard';
import Applet from './android/app/components/applet'
import ShowApplet from './android/app/components/show_applets'

const AppNavigator = StackNavigator({
  HomeScreen: { screen: Home },
  LoginScreen: { screen: Login},
  ConnectScreen: { screen: Connect, navigationOptions: {header: null,} },
  SignUpScreen: { screen: SignUp },
  DashboardScreen: { screen: Dashboard, navigationOptions: { header: null,} },
  AppletScreen: { screen: Applet },
  ShowAppletScreen: { screen: ShowApplet }
  },
  {
    initialRouteName: 'ConnectScreen',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  });

export default class App extends React.Component {
  render() {
    return (
          <AppNavigator />
    );
  }
}