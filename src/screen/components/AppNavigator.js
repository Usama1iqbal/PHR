import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from '../Signup';
import Login from '../Login';
import Home from '../Home';
import ViewDoctor from '../ViewDoctor';
import ViewNotes from '../ViewNotes';
import ViewPatient from '../ViewPatient'
import CBCReport from '../CBCReport'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewDoctor"
        component={ViewDoctor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewNotes"
        component={ViewNotes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewPatient"
        component={ViewPatient}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CBCReport"
        component={CBCReport}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
