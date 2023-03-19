import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, FONTS, DATA, SVG} from '../constants';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Library = () => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const AnimatedShadow = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(
      scrollY.value,
      [0, 40],
      [0, 0.1],
      Extrapolate.CLAMP,
    );

    const elevation = interpolate(
      scrollY.value,
      [0, 40],
      [0, 4],
      Extrapolate.CLAMP,
    );

    return Platform.OS === 'ios'
      ? {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity,
          shadowRadius: 2,
        }
      : {
          elevation,
        };
  });

  const renderHeader = () => (
    <Animated.View
      style={[
        AnimatedShadow,
        styles.header__container,
        {paddingTop: insets.top, paddingHorizontal: 16},
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          left: 16,
          top: '100%',
          position: 'absolute',
        }}>
        <MaterialIcons name="settings" size={28} color={COLORS.darkgrey} />
      </TouchableOpacity>

      <Text style={styles.header__text}>Library</Text>
    </Animated.View>
  );

  const renderTop = () => (
    <View style={{paddingHorizontal: 16}}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        activeOpacity={0.5}>
        <SVG.ShazamLogoSVG width={24} height={24} fill={COLORS.icon1} />
        <View
          style={{
            borderBottomWidth: 0.5,
            flex: 1,
            marginLeft: 16,
            paddingVertical: 12,
            borderColor: COLORS.lightgrey,
          }}>
          <Text style={{...FONTS.m3, color: COLORS.black1}}>Shazams</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        activeOpacity={0.5}>
        <View
          style={{
            overflow: 'hidden',
            borderRadius: 50,
            width: 24,
            height: 24,
            alignItems: 'center',
            paddingTop: 0.5,
          }}>
          <Ionicons name="person" size={24} color={COLORS.icon1} />
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            flex: 1,
            marginLeft: 16,
            paddingVertical: 12,
            borderColor: COLORS.lightgrey,
          }}>
          <Text style={{...FONTS.m3, color: COLORS.black1}}>Artists</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        activeOpacity={0.5}>
        <Ionicons name="musical-notes-sharp" size={25} color={COLORS.icon1} />
        <View style={{marginLeft: 16, paddingVertical: 12}}>
          <Text style={{...FONTS.m3, color: COLORS.black1}}>
            Playlists For You
          </Text>
        </View>
      </TouchableOpacity>

      <Text
        style={{paddingTop: 20, ...FONTS.h2, fontSize: 20, marginBottom: 10}}>
        Recent Shazams
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        marginLeft: 16,
        marginBottom: 16,
        backgroundColor: COLORS.white1,
        borderRadius: 10,
        ...styles.shadow,
      }}>
      <ImageBackground
        source={{uri: `${item?.images?.coverart}`}}
        resizeMode="cover"
        imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: SIZES.width / 2.28,
          height: SIZES.width / 2.3,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{position: 'absolute', right: 5, top: 12}}>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.white1} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.play__button}>
          <Ionicons name="play" size={28} color={COLORS.white1} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={{padding: 10}}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.m4,
            color: COLORS.black1,
            maxWidth: SIZES.width / 3,
          }}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{...FONTS.p4, color: COLORS.icon2, maxWidth: SIZES.width / 3}}>
          {item.subtitle}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: COLORS.black1,
            alignSelf: 'flex-start',
            paddingHorizontal: 8,
            borderRadius: 50,
            marginTop: 30,
          }}>
          <SVG.AppleMusicSVG width={45} height={24} fill={COLORS.white1} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderBottom = () => (
    <View style={{alignItems: 'center', marginTop: 8}}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          backgroundColor: COLORS.blue3,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 120,
          borderRadius: 10,
        }}>
        <Text style={{...FONTS.h4, color: COLORS.white1}}>See all</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {renderHeader()}
      <ReanimatedFlatList
        numColumns={2}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: COLORS.white1}}
        contentContainerStyle={{paddingBottom: 50}}
        data={DATA.ChartsByCountry.slice(0, 5)}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        ListHeaderComponent={renderTop}
        ListFooterComponent={renderBottom}
        scrollEventThrottle={16}
        onScroll={useAnimatedScrollHandler(event => {
          scrollY.value = event.contentOffset.y;
        })}
      />
    </>
  );
};

export default Library;

const styles = StyleSheet.create({
  header__container: {
    zIndex: 2,
    alignItems: 'center',
    backgroundColor: COLORS.white1,
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

  header__text: {
    ...FONTS.h3,
    paddingBottom: 32,
    paddingTop: 5,
    color: COLORS.black1,
  },

  play__button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 100,
    padding: 15,
  },
});
