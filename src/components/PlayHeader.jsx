import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import {COLORS, DATA, FONTS} from '../constants';

const PlayHeader = ({AxisY}) => {
  const BorderColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      AxisY.value,
      [0, 5],
      ['rgb(255,255,255)', 'rgb(212,212,212)'],
    );

    return {borderBottomColor: color};
  });

  return (
    <View>
      <Text style={styles.player__timestamp}>02:55</Text>
      <View style={{position: 'relative'}}>
        <View style={styles.sound__bar2} />
        <View style={styles.sound__bar1} />
      </View>

      <Animated.View style={[BorderColor, styles.header__container]}>
        <Text style={{...FONTS.h4, color: COLORS.orange}}>PLAYING</Text>
        <Text style={{...FONTS.h4, color: COLORS.black1}}>
          Similar to {DATA.TrackDetails[0].title}
        </Text>
      </Animated.View>
    </View>
  );
};

export default PlayHeader;

const styles = StyleSheet.create({
  player__timestamp: {
    color: COLORS.icon2,
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingHorizontal: 6,
    top: -35,
    ...FONTS.m5,
  },

  header__container: {
    backgroundColor: COLORS.white1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    columnGap: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },

  sound__bar2: {
    backgroundColor: 'rgba(255,153,0,0.4)',
    height: 15,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },

  sound__bar1: {
    backgroundColor: COLORS.orange,
    height: 15,
    position: 'absolute',
    bottom: 0,
    width: '40%',
  },
});
