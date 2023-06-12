import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import {COLORS, FONTS, IMAGES, SIZES, SVG} from '../constants';

const TapShazam = ({navigation, route}) => {
  const {itemId} = route.params;
  const inset = useSafeAreaInsets();
  // Logo component
  const renderShazamLogo = () => (
    <View style={styles.shazam__container}>
      <SharedElement id={`item.${itemId}.photo`}>
        {/* <Pressable
          onPress={() => {
            navigation.push('TapShazam');
          }}> */}
        <Animated.View style={[styles.shazam__logo, styles.shadow]}>
          <SVG.ShazamLogo2SVG width={115} height={115} fill={COLORS.white1} />
        </Animated.View>
        {/* </Pressable> */}
      </SharedElement>
    </View>
  );

  const renderCloseButton = () => (
    <Pressable
      style={{
        marginTop: inset.top + 5,
        marginLeft: 16,
        position: 'absolute',
        zIndex: 1,
      }}
      onPress={() => navigation.goBack()}>
      <Icons
        name="close"
        size={32}
        color={COLORS.white1}
        // style={{paddingTop: 5}}
      />
    </Pressable>
  );

  return (
    <LinearGradient colors={[COLORS.blue4, COLORS.blue3]} style={{flex: 1}}>
      {renderCloseButton()}
      {renderShazamLogo()}
    </LinearGradient>
  );
};

export default TapShazam;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
  },

  shadow: {
    shadowColor: COLORS.blue2,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.65,

    elevation: 8,
  },

  top__container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  icon__container: {justifyContent: 'center', alignItems: 'center'},

  icon__text: {...FONTS.m4, color: COLORS.white1, paddingTop: 10},

  library__icon: {
    borderRadius: 50,
    height: 35,
    width: 35,
    overflow: 'hidden',
    marginTop: -5,
  },

  charts__icon: {
    backgroundColor: COLORS.white1,
    borderRadius: 50,
    padding: 4,
  },

  shazam__container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.height / 6,
  },

  shazam__text: {
    ...FONTS.m2,
    fontSize: 26,
    color: COLORS.white1,
    paddingBottom: 50,
  },

  shazam__logo: {
    borderWidth: 0.3,
    borderColor: COLORS.white1,
    backgroundColor: '#4FB3FE',
    padding: 30,
    borderRadius: 1000,
  },

  search__container: {
    marginTop: 100,
    backgroundColor: '#2895FE',
    padding: 30,
    borderRadius: 50,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.blue4,
  },
});
