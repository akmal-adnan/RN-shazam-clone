import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import RootStack from './navigations/RootStack';

const App = () => (
  <NavigationContainer onReady={() => RNBootSplash.hide()}>
    <RootStack />
  </NavigationContainer>
);

export default App;
