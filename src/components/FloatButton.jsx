import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';
import {COLORS, LOTTIE} from '../constants';

const FloatButton = ({navigation}) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <AnimatedTouchable
      entering={ZoomIn.duration(200)}
      exiting={ZoomOut.duration(200)}
      onPress={() => navigation.push('MusicPlayer')}
      activeOpacity={0.7}
      style={{
        position: 'absolute',
        height: 57,
        width: 57,
        backgroundColor: COLORS.white1,
        borderRadius: 80,
        bottom: 26,
        right: 16,
        ...styles.shadow,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Lottie
        source={LOTTIE.SoundBar}
        autoPlay
        loop
        style={
          Platform.OS === 'ios'
            ? {width: 35, height: 35}
            : [
                {
                  transform: [{scale: 1.2}],
                },
              ]
        }
      />
    </AnimatedTouchable>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
