import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Charts, SubCharts, Library, MainScreen} from '../screens';

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const RootStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name="MainScreen" component={MainScreen} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Library" component={Library} />
    <Stack.Screen name="Charts" component={Charts} />
    <Stack.Screen name="SubCharts" component={SubCharts} />
  </Stack.Navigator>
);

export default RootStack;
