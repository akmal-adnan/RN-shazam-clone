import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import {COLORS, FONTS, SIZES, SVG} from '../constants';
import {useGetTopSongRelatedQuery} from '../redux/services/ShazamCore';
import {addTracks} from '../redux/services/PlaybackService';
import {
  setCurrentTrack,
  setPlaying,
  setTracks,
} from '../redux/features/playerSlices';

const TrackTopSongs = ({navigation, adamid}) => {
  const {data: topSong} = useGetTopSongRelatedQuery(adamid);
  const {isPlaying, currentTrack} = useSelector(state => state.player);
  const dispatch = useDispatch();

  const TRACK = topSong?.data[0].views['top-songs'].data
    .map(track => ({
      id: track?.id,
      url: track?.attributes.previews[0].url,
      title: track?.attributes.name,
      artist: track?.attributes.artistName,
      images: track?.attributes.artwork.url
        .replace('{w}', 400)
        .replace('{h}', 400),
    }))
    .filter(track => track.images !== undefined && track.url !== undefined);

  const handlePlay = async (oriTrack, uniqueTracks) => {
    if (currentTrack.id === oriTrack.id) {
      if (!isPlaying) {
        await TrackPlayer.reset();
        await addTracks(uniqueTracks);
        dispatch(setTracks(uniqueTracks));
        dispatch(setCurrentTrack(oriTrack));
        dispatch(setPlaying(!isPlaying));
        await TrackPlayer.play();
      } else {
        dispatch(setPlaying(!isPlaying));
        await TrackPlayer.pause();
      }
    } else {
      await TrackPlayer.reset();
      await addTracks(uniqueTracks);
      dispatch(setTracks(uniqueTracks));
      dispatch(setCurrentTrack(oriTrack));
      dispatch(setPlaying(true));
      await TrackPlayer.play();
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      style={{backgroundColor: COLORS.black1, paddingTop: 20}}>
      <Text style={styles.top__title}>TOP SONGS</Text>

      <ScrollView horizontal bounces={false}>
        <View style={styles.list__container}>
          {topSong?.data[0].views['top-songs'].data.map(item => {
            const oriTrack = {
              id: item?.id,
              url: item?.attributes.previews[0].url,
              title: item?.attributes.name,
              artist: item?.attributes.artistName,
              images: item?.attributes.artwork.url
                .replace('{w}', 400)
                .replace('{h}', 400),
            };

            // Merge track with original list
            const mergeTrack = [oriTrack].concat(TRACK);
            // Remove duplicate tracks based on ID
            const uniqueTracks = mergeTrack.filter(
              (track, index, self) =>
                self.findIndex(t => t.id === track.id) === index,
            );

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={styles.song__container}
                onPress={() =>
                  navigation.push('SongDetails', {songId: item.id})
                }>
                <ImageBackground
                  source={{
                    uri: item.attributes.artwork.url
                      .replace('{w}', 400)
                      .replace('{h}', 400),
                  }}
                  resizeMode="contain"
                  imageStyle={styles.image__style}
                  style={styles.image__container}>
                  <TouchableOpacity
                    onPress={() => handlePlay(oriTrack, uniqueTracks)}
                    activeOpacity={0.7}
                    style={styles.play__button}>
                    {item.id === currentTrack.id ? (
                      <Ionicons
                        name={isPlaying ? 'pause' : 'play'}
                        size={21}
                        color={COLORS.white1}
                      />
                    ) : (
                      <Ionicons name="play" size={21} color={COLORS.white1} />
                    )}
                  </TouchableOpacity>
                </ImageBackground>

                <View style={{marginLeft: 16, gap: 5}}>
                  <Text numberOfLines={1} style={styles.song__title}>
                    {item.attributes.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.song__artist}>
                    {item.attributes.artistName}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.apple_button}>
                    <SVG.AppleMusicSVG
                      width={50}
                      height={15}
                      fill={COLORS.white1}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default TrackTopSongs;

const styles = StyleSheet.create({
  top__title: {
    color: COLORS.white1,
    ...FONTS.h3,
    marginBottom: 25,
    paddingHorizontal: 16,
  },

  list__container: {
    flexWrap: 'wrap',
    height: SIZES.height / 1.8,
    paddingHorizontal: 16,
    rowGap: 35,
    columnGap: 15,
  },

  song__container: {
    flexDirection: 'row',
    width: SIZES.width / 1.16,
  },

  image__style: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.darkgrey,
  },

  image__container: {
    width: SIZES.width / 3.3,
    height: SIZES.width / 3.3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  play__button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 100,
    padding: 15,
  },

  apple_button: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: COLORS.black6,
    bottom: 0,
  },

  song__title: {
    ...FONTS.h3,
    color: COLORS.white1,
    width: SIZES.width / 2.5,
  },

  song__artist: {
    ...FONTS.m3,
    color: COLORS.white1,
    width: SIZES.width / 2.5,
  },
});
