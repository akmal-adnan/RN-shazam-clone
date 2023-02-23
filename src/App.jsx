import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigations/RootStack';

const App = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);

export default App;
