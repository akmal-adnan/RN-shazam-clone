import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const RingOuter = ({index}) => {
  const opacityValue = useSharedValue(4);
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    opacityValue.value = withDelay(
      index * 600,
      withRepeat(
        withTiming(0, {
          duration: 1900,
        }),
        -1,
        false,
      ),
    );

    scaleValue.value = withDelay(
      index * 600,
      withRepeat(
        withTiming(2.1, {
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
    borderWidth: opacityValue.value,
    opacity: opacityValue.value,
  }));

  return <Animated.View style={[styles.circle__container, WaveStyle]} />;
};

export default RingOuter;

const styles = StyleSheet.create({
  circle__container: {
    width: 500,
    height: 500,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: '#14C0FF',
  },
});
