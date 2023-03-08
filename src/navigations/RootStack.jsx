import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  Home,
  Charts,
  SubCharts,
  Library,
  MainScreen,
  SongDetails,
} from '../screens';

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const transitionOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const RootStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen
      name="MainScreen"
      component={MainScreen}
      options={transitionOptions}
    />
    <Stack.Screen name="Home" component={Home} options={transitionOptions} />
    <Stack.Screen
      name="Library"
      component={Library}
      options={transitionOptions}
    />
    <Stack.Screen name="Charts" component={Charts} />
    <Stack.Screen
      name="SubCharts"
      component={SubCharts}
      options={transitionOptions}
    />
    <Stack.Screen
      name="SongDetails"
      component={SongDetails}
      options={transitionOptions}
    />
  </Stack.Navigator>
);

export default RootStack;
