import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, SIZES} from '../constants';
import {useGetSongVideoQuery} from '../redux/services/ShazamCore';

const TrackYoutube = ({url}) => {
  const modifiedUrl = url?.replace('https://cdn.shazam.com/', '');

  const {data} = useGetSongVideoQuery(modifiedUrl);

  return (
    <View style={styles.video__container}>
      <Text style={styles.video__text}>VIDEO</Text>

      <ImageBackground
        source={{uri: data?.image.url}}
        resizeMode="contain"
        imageStyle={{borderRadius: 10}}
        style={styles.video__imageBg}>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.youtube__icon} />
          <MaterialCom name="youtube" size={80} color="#FE0000" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.video__capContainer}>
        <Text numberOfLines={1} style={styles.video__caption}>
          {data?.caption}
        </Text>
      </View>
    </View>
  );
};

export default TrackYoutube;

const styles = StyleSheet.create({
  video__container: {backgroundColor: COLORS.black5, paddingVertical: 35},

  video__text: {
    color: COLORS.white1,
    ...FONTS.h3,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },

  video__imageBg: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: SIZES.width / 1.1,
    height: SIZES.width / 1.95,
    position: 'relative',
  },

  video__capContainer: {
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 10,
    alignItems: 'center',
  },

  video__caption: {
    ...FONTS.h4,
    color: COLORS.white1,
    width: SIZES.width / 1.4,
    textAlign: 'center',
  },

  youtube__icon: {
    top: 25,
    left: 25,
    height: 30,
    width: 30,
    position: 'absolute',
    backgroundColor: 'white',
  },
});
