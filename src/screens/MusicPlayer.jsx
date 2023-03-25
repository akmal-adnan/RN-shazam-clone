import {FlatList, StatusBar, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, DATA, SIZES} from '../constants';
import {
  ApplePlayButton,
  Header2,
  PlayHeader,
  PlayRelated,
  PlayerButton,
} from '../components';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MusicPlayer = ({navigation}) => {
  const scrollY = useSharedValue(0);
  const AxisY = useSharedValue(0);

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

  const renderPlayer = () => (
    <LinearGradient colors={styles.linear__grad1}>
      <Animated.View style={[TranslateY, styles.player__container]}>
        <PlayerButton />

        <Animated.View style={[AnimatedOpacity]}>
          <ApplePlayButton />
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );

  const renderList = () => <PlayHeader AxisY={AxisY} />;

  return (
    <ImageBackground
      source={{
        uri: DATA?.TrackDetails[0]?.images.coverart
          .replace('400', 800)
          .replace('400', 800),
      }}
      resizeMode="cover"
      style={styles.imageBg__container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <LinearGradient
        colors={styles.linear__grad2}
        style={styles.linear__top}
      />

      <LinearGradient
        colors={styles.linear__grad3}
        style={styles.linear__bottom}
      />

      <Header2 navigation={navigation} />

      <ReanimatedFlatList
        bounces={false}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        data={[{key: 1}]}
        keyExtractor={item => item.key}
        ListHeaderComponent={renderPlayer}
        renderItem={renderList}
        ListFooterComponent={<PlayRelated AxisY={AxisY} />}
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
    backgroundColor: COLORS.white1,
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
