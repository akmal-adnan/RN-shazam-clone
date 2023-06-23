import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FONTS, COLORS, IMAGES, SIZES, DATA} from '../constants';
import {ChartCountryList} from '../components';

const Charts = ({navigation}) => {
  const insets = useSafeAreaInsets();

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
    <ChartCountryList navigation={navigation} item={item} />
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
        data={DATA.CountryList}
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
    ...FONTS.h3,
    paddingBottom: 32,
    paddingTop: 5,
    color: COLORS.black1,
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
