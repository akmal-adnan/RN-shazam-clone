import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {FONTS, COLORS, SIZES, ChartsByCountry, IMAGES} from '../constants';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SubCharts = ({navigation, route}) => {
  const scrollY = useSharedValue(0);

  const insets = useSafeAreaInsets();
  const {country} = route.params;

  const AnimatedShadow = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(
      scrollY.value,
      [0, 40],
      [0, 0.18],
      Extrapolate.CLAMP,
    );

    const elevation = interpolate(
      scrollY.value,
      [0, 40],
      [0, 5],
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
        {paddingTop: insets.top},
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.darkgrey} />
        </TouchableOpacity>
        <Text style={styles.header__text}>{country} Chart</Text>
      </View>
      <Material name="playlist-add-check" size={30} color={COLORS.darkgrey} />
    </Animated.View>
  );

  const renderButton = () => (
    <View style={{paddingVertical: 15, alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 120,
          backgroundColor: COLORS.blue1,
          borderRadius: 8,
        }}>
        <Text style={{...FONTS.h4, color: COLORS.white1}}>Play All</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        position: 'relative',
      }}>
      <ImageBackground
        source={{uri: `${item?.images?.coverart}`}}
        resizeMode="contain"
        imageStyle={{borderRadius: 5}}
        style={styles.song__cover}>
        <View
          style={{
            borderRadius: 5,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
            width: '22%',
            height: '22%',
          }}>
          <Text style={{...FONTS.m4, fontSize: 14, color: COLORS.white1}}>
            {index + 1}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: 'rgba(0,0,0,0.55)',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 100,
            padding: 14,
            marginTop: 10,
          }}>
          <Ionicons name="play" size={18} color={COLORS.white1} />
        </TouchableOpacity>
      </ImageBackground>

      {/* Descripiton */}
      <View
        style={{
          flex: 1,
          marginLeft: 16,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text numberOfLines={1} style={styles.song__title}>
            {item?.title}
          </Text>
          <Text numberOfLines={1} style={styles.song__subtitle}>
            {item?.subtitle}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: COLORS.black1,
              borderRadius: 50,
              alignItems: 'center',
              width: 60,
            }}>
            <Image
              source={IMAGES.AppleMusic}
              resizeMode="contain"
              style={{width: 45, height: 23}}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={{marginRight: -5}}>
            <Ionicons name="ellipsis-vertical" size={24} color={COLORS.icon1} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            bottom: 0,
            width: '100%',
            borderColor: COLORS.lightgrey,
            position: 'absolute',
            borderBottomWidth: 1,
            marginBottom: -15,
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.main__container}>
      {renderHeader()}

      <ReanimatedFlatList
        ListHeaderComponent={renderButton}
        contentContainerStyle={{paddingBottom: 50}}
        bounces={false}
        scrollEventThrottle={16}
        data={ChartsByCountry.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        onScroll={useAnimatedScrollHandler(event => {
          scrollY.value = event.contentOffset.y;
        })}
      />
    </View>
  );
};

export default SubCharts;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
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

  header__container: {
    zIndex: 2,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white1,
    paddingHorizontal: 16,
    height: 106,
  },

  header__text: {
    ...FONTS.m3,
    paddingLeft: 30,
    color: COLORS.black1,
  },

  song__cover: {
    width: SIZES.width / 3.3,
    height: SIZES.width / 3.3,
  },

  song__title: {
    ...FONTS.m4,
    fontSize: 16,
    color: COLORS.black1,
    width: SIZES.width / 2,
  },

  song__subtitle: {
    ...FONTS.p4,
    fontSize: 15,
    color: COLORS.icon2,
    paddingTop: 2,
    width: SIZES.width / 2,
  },
});
