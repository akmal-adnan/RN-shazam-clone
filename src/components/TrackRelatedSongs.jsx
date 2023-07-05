import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {FadeInDown, FadeOut} from 'react-native-reanimated';
import {COLORS, FONTS, SIZES, SVG} from '../constants';

const TrackRelatedSongs = ({navigation, songTrackRelated}) => {
  const [display, setDisplay] = React.useState(false);

  if (display) {
    setTimeout(() => {
      setDisplay(false);
    }, 2000);
  }

  const renderList = ({item, index}) => (
    <View style={{paddingLeft: index === 0 ? 16 : 0, paddingRight: 16}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (item.hub.actions) {
            navigation.push('SongDetails', {songId: item?.hub?.actions[0]?.id});
          } else {
            setDisplay(true);
          }
        }}>
        <ImageBackground
          source={{
            uri: item?.images?.coverart,
          }}
          resizeMode="contain"
          imageStyle={styles.image__style}
          style={styles.image__container}>
          {item.hub.actions && (
            <TouchableOpacity activeOpacity={0.7} style={styles.play__button}>
              <Ionicons name="play" size={28} color={COLORS.white1} />
            </TouchableOpacity>
          )}
        </ImageBackground>

        <Text numberOfLines={1} style={styles.song__title}>
          {item.title}
        </Text>

        <Text numberOfLines={1} style={styles.song__artist}>
          {item.subtitle}
        </Text>

        <TouchableOpacity activeOpacity={0.7} style={styles.apple__button}>
          <SVG.AppleMusicSVG width={50} height={15} fill={COLORS.white1} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={{backgroundColor: COLORS.black1, paddingVertical: 35}}>
        <Text
          style={{
            color: COLORS.white1,
            ...FONTS.h3,
            paddingBottom: 20,
            paddingHorizontal: 16,
          }}>
          YOU MAY ALSO LIKE
        </Text>

        <FlatList
          horizontal
          bounces={false}
          data={songTrackRelated?.tracks}
          renderItem={renderList}
          keyExtractor={item => item.key}
        />
      </View>

      {display ? (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOut}
          style={{
            backgroundColor: COLORS.darkgrey,
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: 7,
            paddingHorizontal: 20,
            borderRadius: 5,
            bottom: 0,
          }}>
          <Text style={{...FONTS.p4, color: COLORS.white1}}>
            There are some problems with the api
          </Text>
        </Animated.View>
      ) : (
        // For exiting animation to work when component removed
        <View />
      )}
    </>
  );
};

export default TrackRelatedSongs;

const styles = StyleSheet.create({
  image__style: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.darkgrey,
  },

  image__container: {
    width: SIZES.width / 2.55,
    height: SIZES.width / 2.55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  play__button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 100,
    padding: 15,
  },

  song__title: {
    ...FONTS.m3,
    color: COLORS.white1,
    width: 140,
    paddingTop: 10,
    paddingBottom: 5,
  },

  song__artist: {
    ...FONTS.p4,
    color: COLORS.white1,
    width: 100,
    paddingBottom: 20,
  },

  apple__button: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: COLORS.black6,
    alignSelf: 'flex-start',
  },
});
