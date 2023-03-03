import React, {useState} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FONTS, COLORS, ChartsByCountry, IMAGES, SIZES} from '../constants';

const Charts = () => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState(ChartsByCountry.slice(0, 10));

  const renderHeader = () => (
    <View
      style={[
        styles.header__container,
        styles.shadow,
        {paddingTop: insets.top},
      ]}>
      <Text style={styles.header__text}>Charts</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <View key={item.key} style={[styles.charts__group, styles.shadow2]}>
      <View style={styles.charts__text}>
        <Text style={styles.charts__title}>Malaysia Chart</Text>
        <Text style={styles.see__all}>See all</Text>
      </View>

      <View style={{flexDirection: 'row', paddingBottom: 20}}>
        {ChartsByCountry?.slice(3, 6).map(song => (
          <View key={song.key} style={{marginRight: 10}}>
            <Image
              source={{uri: `${song?.images?.coverart}`}}
              resizeMode="contain"
              style={styles.song__cover}
            />
            <Text numberOfLines={1} style={styles.song__title}>
              {song.title}
            </Text>
            <Text numberOfLines={1} style={styles.song__subtitle}>
              {song.subtitle}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderMap = () => (
    <View style={[styles.map__container, {marginTop: insets.top + 58}]}>
      <Image
        source={IMAGES.WorldMap}
        resizeMode="cover"
        style={styles.map__image}
      />

      <TouchableOpacity activeOpacity={0.8} style={styles.map__button}>
        <Text style={styles.map__title}>Country City & Charts</Text>
      </TouchableOpacity>

      <View style={{position: 'absolute', top: 135}}>
        <Text style={styles.map__substitle}>FROM AROUND THE WORLD</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.main__container}>
      {renderHeader()}

      <FlatList
        bounces={false}
        data={data}
        ListHeaderComponent={renderMap}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
      />
    </View>
  );
};

export default Charts;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },

  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2,

    elevation: 5,
  },

  shadow2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  header__container: {
    zIndex: 2,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white1,
  },

  header__text: {
    ...FONTS.m3,
    paddingBottom: 32,
    paddingTop: 5,
    color: COLORS.black1,
  },

  charts__group: {
    backgroundColor: COLORS.white1,
    paddingHorizontal: 16,
    marginTop: 10,
  },

  charts__text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  charts__title: {...FONTS.m4, color: COLORS.icon2},

  see__all: {...FONTS.m5, color: COLORS.blue1},

  song__cover: {
    width: SIZES.width / 3.45,
    height: SIZES.width / 3.45,
    borderRadius: 5,
  },

  song__title: {
    ...FONTS.m4,
    fontSize: 16,
    color: COLORS.black1,
    paddingTop: 8,
    width: 110,
  },

  song__subtitle: {
    ...FONTS.p4,
    fontSize: 15,
    color: COLORS.icon2,
    paddingTop: 2,
    width: 110,
  },

  map__container: {
    flex: 1,
    backgroundColor: COLORS.purple,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  map__image: {
    width: SIZES.width + 150,
    height: SIZES.height / 4 + 20,
    opacity: 0.22,
    aspectRatio: 2.5,
  },

  map__button: {
    top: 75,
    position: 'absolute',
    backgroundColor: COLORS.white1,
    borderRadius: 8,
  },

  map__title: {
    ...FONTS.h4,
    paddingHorizontal: 70,
    paddingVertical: 14,
    color: COLORS.purple,
  },

  map__substitle: {...FONTS.m5, color: COLORS.white1},
});
