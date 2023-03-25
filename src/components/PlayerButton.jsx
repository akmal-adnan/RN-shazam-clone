import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer, {State} from 'react-native-track-player';
import {setupPlayer, addTracks} from '../redux/services/PlaybackService';
import {setTracks, setPlaybackState} from '../redux/features/playerSlices';
import {COLORS, SIZES} from '../constants';

const TRACK = [
  {
    id: 1,
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/99/3e/6f/993e6fb0-0b92-6461-a2ff-21d8c5d71afd/mzaf_1460326504649577708.plus.aac.ep.m4a',
    title: 'Fluidity',
    artist: 'tobylane',
    //   duration: 60,
  },
  {
    id: 2,
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/d4/60/92/d4609241-0bb2-4b59-1e97-c2e671a0139c/mzaf_14378477710218482188.plus.aac.p.m4a',
    title: 'Modern Chillout',
    artist: 'penguinmusic',
    //   duration: 66,
  },
  {
    id: 3,
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/b3/a8/f8/b3a8f80e-1ee4-fa97-b46f-de255f4ef06a/mzaf_11000406095139762500.plus.aac.ep.m4a',
    title: 'Powerful Beat',
    artist: 'penguinmusic',
    //   duration: 73,
  },
];
const PlayerButton = () => {
  const dispatch = useDispatch();
  //   Get state val form redux
  const playerState = useSelector(state => state.player);
  const {tracks, playbackState} = playerState;

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      const isSetup = await setupPlayer();

      if (isSetup) {
        await addTracks(tracks);
        setIsPlayerReady(isSetup);
      }
    }

    dispatch(setTracks(TRACK)); // Should add to react navigation route later
    setup();
  }, [dispatch, tracks]);

  const handlePlayPause = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
      dispatch(setPlaybackState(State.Paused));
    } else {
      await TrackPlayer.play();
      dispatch(setPlaybackState(State.Playing));
    }
  };

  return (
    <View>
      <View style={styles.player__button}>
        <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
          <Entypo
            name="controller-jump-to-start"
            size={60}
            color={COLORS.orange}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.play__button}
          onPress={() => handlePlayPause()}>
          {isPlayerReady ? (
            <Entypo
              name={
                playbackState === State.Playing
                  ? 'controller-paus'
                  : 'controller-play'
              }
              size={40}
              color={COLORS.white1}
            />
          ) : (
            <ActivityIndicator color={COLORS.white1} size="large" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.skipToNext}>
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
