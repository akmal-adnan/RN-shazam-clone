import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import {COLORS, SIZES} from '../constants';
import {
  ApplePlayButton,
  Header2,
  PlayHeader,
  PlayRelated,
  PlayerButton,
} from '../components';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);
const ReanimatedImage = Animated.createAnimatedComponent(Image);

const MusicPlayer = ({navigation}) => {
  const scrollRef = useRef();
  const scrollY = useSharedValue(0);
  const AxisY = useSharedValue(0);

  const playerState = useSelector(state => state.player);
  const {tracks} = playerState;
  const [trackIndex, setTrackIndex] = useState(0);

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({animated: false});
    }, 150);
  }, []);

  useEffect(() => {
    async function setup() {
      await getCurrentTrackInfo();
    }
    setup();

    const listener = TrackPlayer.addEventListener(
      'playback-track-changed',
      () => {
        setIsVisible(false);
        getCurrentTrackInfo();
      },
    );

    return () => {
      listener.remove();
    };
  }, [tracks]);

  const TranslateY = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 500],
      [0, 140],
      Extrapolate.CLAMP,
    );

    return {transform: [{translateY}]};
  });

  const AnimatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 500],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  const getCurrentTrackInfo = async () => {
    try {
      const index = await TrackPlayer.getCurrentTrack();
      setTrackIndex(index);
      setIsVisible(true);
    } catch (error) {
      console.log('Error retrieving current track:', error);
    }
  };

  const renderPlayer = () => (
    <LinearGradient colors={styles.linear__grad1}>
      <Animated.View style={[TranslateY, styles.player__container]}>
        {/* Media player */}
        <PlayerButton trackIndex={trackIndex} trackLength={tracks.length} />

        {/* Playfull songs button */}
        <Animated.View style={[AnimatedOpacity]}>
          <TouchableOpacity onPress={() => toggleVisibility()}>
            <ApplePlayButton />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );

  // This is the trackbar progress
  const renderTrackBar = () => <PlayHeader AxisY={AxisY} trackList={tracks} />;

  // This is the related song list
  const renderTrackList = useCallback(
    () => (
      <PlayRelated AxisY={AxisY} trackList={tracks} trackIndex={trackIndex} />
    ),
    [AxisY, trackIndex, tracks],
  );

  const renderImage = useCallback(
    () => (
      <Animated.View style={{position: 'absolute', zIndex: -1}}>
        <ReanimatedImage
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}
          style={{
            width: SIZES.width,
            height: SIZES.height / 1.5,
          }}
          resizeMode="cover"
          source={{
            uri: tracks[trackIndex]?.images
              .replace('400', 800)
              .replace('400', 800),
          }}
        />
      </Animated.View>
    ),
    [trackIndex, tracks],
  );

  return (
    <ImageBackground resizeMode="cover" style={styles.imageBg__container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      {/* Image background replace with this image for fade animation transition */}
      {isVisible && renderImage()}

      <LinearGradient
        colors={styles.linear__grad2}
        style={styles.linear__top}
      />

      <LinearGradient
        colors={styles.linear__grad3}
        style={styles.linear__bottom}
      />

      <Header2
        navigation={navigation}
        trackList={tracks}
        trackIndex={trackIndex}
      />

      <ReanimatedFlatList
        ref={scrollRef}
        bounces={false}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        data={[{key: 1}]}
        keyExtractor={item => item.key}
        ListHeaderComponent={renderPlayer}
        renderItem={renderTrackBar}
        ListFooterComponent={renderTrackList()}
        ListFooterComponentStyle={{height: SIZES.height / 1.53}}
        scrollEventThrottle={16}
        onScroll={useAnimatedScrollHandler(event => {
          scrollY.value = event.contentOffset.y;
        })}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={SIZES.height}
      />
    </ImageBackground>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  linear__grad1: [
    'rgba(0,0,0, 0)',
    'rgba(0,0,0, 0)',
    'rgba(0,0,0, 0)',
    'rgba(0,0,0, 0.7)',
  ],

  linear__grad2: ['rgba(0,0,0, 0.8)', 'rgba(0,0,0, 0)'],

  linear__grad3: [
    'rgba(0,0,0, 0)',
    'rgba(0,0,0, 0)',
    'rgba(0,0,0, 0.95)',
    'rgba(0,0,0, 1)',
    'rgba(0,0,0, 1)',
  ],

  linear__top: {
    position: 'absolute',
    width: '100%',
    height: SIZES.height / 3.4,
    top: 0,
  },

  linear__bottom: {
    position: 'absolute',
    width: '100%',
    height: SIZES.height / 1.5,
    bottom: 0,
  },

  imageBg__container: {
    width: SIZES.width,
    height: SIZES.height / 1.5,
    backgroundColor: COLORS.black1,
    flex: 1,
  },

  player__container: {
    alignSelf: 'center',
    paddingTop: SIZES.height / 1.485,
    paddingBottom: 25,
  },

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
