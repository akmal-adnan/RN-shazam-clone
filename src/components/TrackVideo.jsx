import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Video} from 'expo-av';

import {SIZES} from '../constants';
import {useGetSongVideoQuery} from '../redux/services/ShazamCore';

const TrackVideo = ({videoUrl}) => {
  const modifiedUrl = videoUrl?.replace('https://cdn.shazam.com/', '');

  const {data} = useGetSongVideoQuery(modifiedUrl);

  return (
    <View style={styles.video__container}>
      <Video
        style={styles.video_process}
        source={{
          uri: data?.actions[0].uri,
        }}
        resizeMode="cover"
        isLooping
        shouldPlay
        isMuted
      />
    </View>
  );
};

export default TrackVideo;

const styles = StyleSheet.create({
  video_process: {
    width: SIZES.width,
    height: SIZES.height / 1.2,
    pointerEvents: 'none',
  },

  video__container: {position: 'absolute'},
});
