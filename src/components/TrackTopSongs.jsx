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
import {COLORS, DATA, FONTS, SIZES, SVG} from '../constants';

const TrackTopSongs = () => (
  <View style={{backgroundColor: COLORS.black1, paddingTop: 25}}>
    <Text style={styles.top__title}>TOP SONGS</Text>

    <ScrollView horizontal bounces={false}>
      <View style={styles.list__container}>
        {DATA?.FeaturedSongs?.data[0]?.views['top-songs'].data.map(item => (
          <View key={item.id} style={styles.song__container}>
            <ImageBackground
              source={{
                uri: item.attributes.artwork.url
                  .replace('{w}', 300)
                  .replace('{h}', 300),
              }}
              resizeMode="contain"
              imageStyle={styles.image__style}
              style={styles.image__container}>
              <TouchableOpacity activeOpacity={0.7} style={styles.play__button}>
                <Ionicons name="play" size={28} color={COLORS.white1} />
              </TouchableOpacity>
            </ImageBackground>

            <View style={{marginLeft: 16, gap: 5}}>
              <Text numberOfLines={1} style={styles.song__title}>
                {item.attributes.name}
              </Text>
              <Text numberOfLines={1} style={styles.song__artist}>
                {item.attributes.artistName}
              </Text>

              <TouchableOpacity activeOpacity={0.7} style={styles.apple_button}>
                <SVG.AppleMusicSVG
                  width={50}
                  height={15}
                  fill={COLORS.white1}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  </View>
);

export default TrackTopSongs;

const styles = StyleSheet.create({
  top__title: {
    color: COLORS.white1,
    ...FONTS.h3,
    marginBottom: 30,
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
