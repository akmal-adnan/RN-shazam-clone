import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Animated, {
  FadeInDown,
  Layout,
  FadeOutUp,
  withTiming,
  withSequence,
  withRepeat,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import Lottie from 'lottie-react-native';
import {COLORS, FONTS, LOTTIE, SIZES, SVG} from '../constants';
import {RingAnimation, RingOuter} from '../components';

const TapShazam = ({navigation, route}) => {
  const {itemId} = route.params;
  const inset = useSafeAreaInsets();
  const pulse = useSharedValue(1);

  const [showText, setText] = useState(true);

  // Text interval
  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(!showText);
    }, 5000); // Duration to display each set of text

    return () => {
      clearTimeout(timeout);
    };
  }, [showText]);

  // Pulse animation
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.02, {duration: 500}),
        withTiming(1, {duration: 500}),
      ),
      -1,
    );
  }, [pulse]);

  // Define the pulsating animation
  const pulseAnimation = useAnimatedStyle(() => ({
    transform: [{scale: pulse.value}],
  }));

  // Logo component
  const renderShazamLogo = () => (
    <View style={styles.shazam__container}>
      {/* Wave */}
      {[...Array(3).keys()].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <RingAnimation key={index} index={index} />
      ))}

      {[...Array(2).keys()].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <RingOuter key={index} index={index} />
      ))}

      <SharedElement id={`item.${itemId}.photo`}>
        <Animated.View
          style={[styles.shazam__logo, styles.shadow, pulseAnimation]}>
          <SVG.ShazamLogo2SVG width={110} height={110} fill={COLORS.white1} />
        </Animated.View>
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
      <Icons name="close" size={32} color={COLORS.white1} />
    </Pressable>
  );

  const renderText = () => (
    <Animated.View
      entering={FadeInDown.delay(400)}
      style={{
        marginTop: SIZES.height / 4.5,
      }}>
      <View style={{alignItems: 'center'}}>
        <Lottie
          source={LOTTIE.WaveLoading}
          autoPlay
          loop
          style={{
            width: 25,
            height: 25,
            marginBottom: 8,
          }}
        />
      </View>

      {showText && (
        <Animated.View
          style={{alignItems: 'center'}}
          entering={FadeInDown}
          exiting={FadeOutUp}>
          <Text style={{...FONTS.m2, color: COLORS.white1}}>
            Listening for music
          </Text>
          <Text style={{...FONTS.p4, color: COLORS.icon1}}>
            Make sure your device can hear the song clearly
          </Text>
        </Animated.View>
      )}

      {!showText && (
        <Animated.View
          style={{alignItems: 'center'}}
          entering={FadeInDown}
          exiting={FadeOutUp}
          layout={Layout}>
          <Text style={{...FONTS.m2, color: COLORS.white1}}>
            Searching for a match
          </Text>
          <Text style={{...FONTS.p4, color: COLORS.icon1}}>Please Wait</Text>
        </Animated.View>
      )}
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={[COLORS.blue4, COLORS.blue3]}
      style={styles.main__container}>
      {renderCloseButton()}
      {renderShazamLogo()}
      {renderText()}
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

  shazam__container: {
    marginTop: SIZES.height / 3.7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shazam__logo: {
    borderWidth: 0.3,
    borderColor: COLORS.white1,
    backgroundColor: '#4FB3FE',
    padding: 30,
    borderRadius: 1000,
  },
});
