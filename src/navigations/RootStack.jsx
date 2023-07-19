import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {
  Home,
  Charts,
  SubCharts,
  Library,
  MainScreen,
  SongDetails,
  MusicPlayer,
  SplashScreen,
  TapShazam,
} from '../screens';

const Stack = createSharedElementStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const transitionOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const fadeTrandisiton = () => ({
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 300}},
    close: {animation: 'timing', config: {duration: 300}},
  },
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
});

const fadeTrandisitonSplash = () => ({
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 1000}},
    close: {animation: 'timing', config: {duration: 1000}},
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
      options={fadeTrandisitonSplash}
    />

    <Stack.Screen
      name="MainScreen"
      component={MainScreen}
      options={fadeTrandisitonSplash}
      // eslint-disable-next-line consistent-return
      // sharedElements={(route, otherRoute) => {
      //   const {itemId} = route.params;
      //   if (otherRoute.name === 'SplashScreen') {
      //     return [`item.${itemId}.photo`];
      //   }
      // }}
    />

    <Stack.Screen name="Home" component={Home} options={transitionOptions} />

    <Stack.Screen
      name="TapShazam"
      component={TapShazam}
      options={fadeTrandisiton}
      sharedElements={route => {
        const {itemId} = route.params;
        return [`item.${itemId}.photo`];
      }}
    />

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
