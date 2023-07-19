import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import {IMAGES, COLORS} from '../constants';

const SplashScreen = ({navigation}) => {
  const itemId = 3231;

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainScreen', {itemId});
    }, 500);
  }, [navigation]);

  const renderShazamLogo = () => (
    <SharedElement id={`item.${itemId}.photo`}>
      <Image
        source={IMAGES.ShazamLogo}
        resizeMode="contain"
        style={styles.image__logo}
      />
    </SharedElement>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      {renderShazamLogo()}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white1,
  },

  image__logo: {
    width: 180,
    height: 180,
    tintColor: COLORS.blue1,
  },
});
