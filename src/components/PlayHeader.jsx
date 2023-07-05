import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import {Slider} from '@miblanchard/react-native-slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {COLORS, FONTS, SIZES} from '../constants';

const PlayHeader = ({AxisY, trackList}) => {
  const progress = useProgress();

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
      <Text style={styles.player__timestamp}>
        {new Date((progress.duration - progress.position) * 1000)
          .toISOString()
          .substring(14, 19)}
      </Text>

      {/* Slider control */}
      <Slider
        value={progress.position}
        maximumValue={progress.duration}
        onSlidingComplete={async value => {
          await TrackPlayer.seekTo(Number(value));
        }}
        containerStyle={{backgroundColor: 'rgba(0,0,0, 0.6)', height: 15}}
        animateTransitions
        animationType="timing"
        minimumTrackTintColor={COLORS.orange}
        thumbStyle={{
          backgroundColor: COLORS.orange,
          height: 15,
          borderRadius: 0,
        }}
        trackStyle={{backgroundColor: 'rgba(255,153,0,0.5)', height: 15}}
      />

      <Animated.View style={[BorderColor, styles.header__container]}>
        <Text style={{...FONTS.h4, color: COLORS.orange}}>PLAYING</Text>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.h4,
            color: COLORS.black1,
            maxWidth: SIZES.width / 1.4,
          }}>
          Similar to {trackList[0]?.title}
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
    top: -23,
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
