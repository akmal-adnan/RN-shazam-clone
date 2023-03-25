import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  Home,
  Charts,
  SubCharts,
  Library,
  MainScreen,
  SongDetails,
  MusicPlayer,
  SplashScreen,
} from '../screens';

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const transitionOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const fadeTrandisiton = () => ({
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 200}},
    close: {animation: 'timing', config: {duration: 200}},
  },
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
});

const RootStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={fadeTrandisiton}
    />

    <Stack.Screen
      name="MainScreen"
      component={MainScreen}
      options={fadeTrandisiton}
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

    <Stack.Screen
      name="MusicPlayer"
      component={MusicPlayer}
      options={{...TransitionPresets.ModalSlideFromBottomIOS}}
    />
  </Stack.Navigator>
);

export default RootStack;
