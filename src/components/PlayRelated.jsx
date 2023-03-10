import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SIZES, FONTS, COLORS, DATA, SVG} from '../constants';

const PlayRelated = ({AxisY}) => {
  const renderSongHeader = () => (
    <View style={styles.song__header}>
      <Image
        source={{uri: DATA?.TrackDetails[0]?.images.coverart}}
        resizeMode="cover"
        style={styles.song__image}
      />

      <View style={{justifyContent: 'space-between', paddingLeft: 16}}>
        <Text style={styles.song__textdesc}>
          Listen to full songs, albums and more on Apple Music.
        </Text>

        <TouchableOpacity style={styles.apple__button}>
          <Text style={{color: COLORS.white1, ...FONTS.m4}}>Listen on </Text>
          <SVG.AppleMusicSVG fill={COLORS.white1} width={60} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSongsList = ({item}) => (
    <TouchableOpacity activeOpacity={0.6} style={styles.song__button}>
      <View>
        <Text style={{...FONTS.h3, width: SIZES.width / 1.3}} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{...FONTS.m4, width: SIZES.width / 1.3}} numberOfLines={1}>
          {item.subtitle}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.6}>
        <Ionicons name="ellipsis-vertical" size={24} color={COLORS.icon1} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <Animated.ScrollView
      bounces={false}
      scrollEventThrottle={16}
      onScroll={useAnimatedScrollHandler(event => {
        AxisY.value = event.contentOffset.y;
      })}>
      <FlatList
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: COLORS.white1, paddingBottom: 50}}
        data={DATA.TrackRelated}
        renderItem={renderSongsList}
        ListHeaderComponent={renderSongHeader}
        key={item => item.key}
      />
    </Animated.ScrollView>
  );
};

export default PlayRelated;

const styles = StyleSheet.create({
  song__header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  song__image: {
    width: SIZES.width / 4,
    height: SIZES.width / 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.icon1,
  },

  song__textdesc: {
    color: COLORS.black1,
    ...FONTS.m4,
    flexWrap: 'wrap',
    width: SIZES.width / 1.55,
  },

  song__button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },

  apple__button: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: COLORS.peach,
  },
});
