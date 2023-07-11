import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import {setPlaying} from '../redux/features/playerSlices';
import {COLORS, SIZES} from '../constants';

const PlayerButton = ({trackIndex, trackLength}) => {
  const dispatch = useDispatch();
  const {isPlaying} = useSelector(state => state.player);

  const handlePlay = async () => {
    if (isPlaying === true) {
      dispatch(setPlaying(false));
      await TrackPlayer.pause();
    } else {
      dispatch(setPlaying(true));
      await TrackPlayer.play();
    }
  };

  return (
    <View>
      <View style={styles.player__button}>
        <TouchableOpacity
          onPress={() => {
            if (trackIndex < 1) {
              TrackPlayer.skip(trackLength - 1);
            } else {
              TrackPlayer.skipToPrevious();
            }
          }}>
          <Entypo
            name="controller-jump-to-start"
            size={60}
            color={COLORS.orange}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.play__button}
          onPress={() => handlePlay()}>
          <Entypo
            name={isPlaying ? 'controller-paus' : 'controller-play'}
            size={40}
            color={COLORS.white1}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
          <Entypo name="controller-next" size={60} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerButton;

const styles = StyleSheet.create({
  player__button: {
    width: SIZES.width,
    maxWidth: 240,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  play__button: {
    backgroundColor: COLORS.orange,
    padding: 18,
    borderRadius: 100,
  },
});
