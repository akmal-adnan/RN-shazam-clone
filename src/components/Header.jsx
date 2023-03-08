import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {FONTS, COLORS} from '../constants';

const Header = ({navigation, country, scrollY}) => {
  const insets = useSafeAreaInsets();

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

  return (
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

      <TouchableOpacity activeOpacity={0.7}>
        <Material name="playlist-add-check" size={30} color={COLORS.darkgrey} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
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
});
