import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../constants';

const RingAnimation = ({index}) => {
  const opacityValue = useSharedValue(0.7);
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    opacityValue.value = withDelay(
      index * 250,
      withRepeat(
        withTiming(0, {
          duration: 1900,
        }),
        -1,
        false,
      ),
    );

    scaleValue.value = withDelay(
      index * 250,
      withRepeat(
        withTiming(3.5, {
          duration: 1900,
        }),
        -1,
        false,
      ),
    );
  }, [opacityValue, scaleValue, index]);

  const WaveStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scaleValue.value,
      },
    ],
    opacity: opacityValue.value,
  }));

  return <Animated.View style={[styles.circle__container, WaveStyle]} />;
};

export default RingAnimation;

const styles = StyleSheet.create({
  circle__container: {
    width: 155,
    height: 155,
    backgroundColor: COLORS.blue4,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
