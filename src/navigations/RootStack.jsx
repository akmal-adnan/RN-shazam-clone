import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Charts, SubCharts, Library} from '../screens';

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Library" component={Library} />
    <Stack.Screen name="Charts" component={Charts} />
    <Stack.Screen name="SubCharts" component={SubCharts} />
  </Stack.Navigator>
);

export default RootStack;
