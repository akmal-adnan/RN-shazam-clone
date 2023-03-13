import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import store from './redux/store';
import RootStack from './navigations/RootStack';

const App = () => (
  <Provider store={store}>
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <RootStack />
    </NavigationContainer>
  </Provider>
);

export default App;
