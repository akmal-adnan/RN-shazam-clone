import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchIco from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, IMAGES, SIZES, SVG} from '../constants';

const Home = () => {
  // Top component
  const renderTop = () => (
    <View style={styles.top__container}>
      <View style={styles.icon__container}>
        <View style={styles.library__icon}>
          <Icons
            name="account-music"
            size={35}
            color={COLORS.white1}
            style={{paddingTop: 5}}
          />
        </View>
        <Text style={styles.icon__text}>Library</Text>
      </View>

      <View style={styles.icon__container}>
        <View style={styles.charts__icon}>
          <Image
            source={IMAGES.ChartsIcon}
            resizeMode="contain"
            style={{width: 20, height: 20, tintColor: COLORS.blue4}}
          />
        </View>
        <Text style={styles.icon__text}>Charts</Text>
      </View>
    </View>
  );

  // Logo component
  const renderShazamLogo = () => (
    <View style={styles.shazam__container}>
      <Text style={styles.shazam__text}>Tap to Shazam</Text>
      <View style={[styles.shazam__logo, styles.shadow]}>
        <SVG.ShazamLogo2SVG width={145} height={145} fill={COLORS.white1} />
      </View>

      <View style={[styles.search__container, styles.shadow]}>
        <SearchIco
          name="search"
          size={28}
          color={COLORS.white1}
          style={{position: 'absolute'}}
        />
      </View>
    </View>
  );

  return (
    <LinearGradient colors={[COLORS.blue4, COLORS.blue3]} style={{flex: 1}}>
      <SafeAreaView style={styles.main__container}>
        {renderTop()}
        {renderShazamLogo()}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

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
    paddingTop: 8,
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
    marginBottom: SIZES.height / 8,
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
    borderRadius: 100,
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
