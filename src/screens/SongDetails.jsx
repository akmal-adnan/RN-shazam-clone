import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  Layout,
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES, SVG} from '../constants';
import {
  ApplePlayButton,
  TrackRelatedSongs,
  TrackTopSongs,
  TrackYoutube,
} from '../components';
import {
  useGetSongCountQuery,
  useGetSongDetailsQuery,
  useGetSongMetaDataQuery,
} from '../redux/services/ShazamCore';

const SongDetails = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const {songId} = route.params;

  const {data: songDetailsData} = useGetSongDetailsQuery(songId);

  const newSongId = songDetailsData?.data[0].id;

  const {data: songMetaData} = useGetSongMetaDataQuery(newSongId);

  const {data: songShazamCount} = useGetSongCountQuery(newSongId);

  const animateHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [280, 440],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {
      backgroundColor: `rgba(18,18,18, ${opacity})`,
      borderBottomColor: `rgba(44,44,44, ${opacity})`,
    };
  });

  const titileOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [436, 460],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  const iconOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [100, 260],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  const renderHeader = () => (
    <Animated.View
      style={[
        animateHeader,
        styles.header__container,
        {paddingTop: insets.top},
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.white1} />
        </TouchableOpacity>
        <Animated.Text
          numberOfLines={1}
          style={[
            titileOpacity,
            {
              ...styles.header__text,
              paddingLeft: 18,
              maxWidth: SIZES.width / 1.5,
            },
          ]}>
          {songMetaData?.title}
        </Animated.Text>
      </View>

      <Animated.View
        style={[iconOpacity, {flexDirection: 'row', alignItems: 'center'}]}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          activeOpacity={0.6}>
          <MaterialCom name="playlist-music" size={30} color={COLORS.white1} />
          <Text style={styles.header__text}>LYRICS</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons
            name="ios-share-social-sharp"
            size={25}
            color={COLORS.white1}
            style={{paddingRight: 30, paddingLeft: 20}}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.icon1} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );

  const renderItemTop = () => (
    <LinearGradient
      colors={[
        'rgba(0,0,0, 0.2)',
        'rgba(0,0,0, 0.3)',
        'rgba(0,0,0, 0.65)',
        'rgba(0,0,0, 1)',
      ]}
      style={{
        height: SIZES.height / 1.13,
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{color: COLORS.white1, ...FONTS.h1, paddingBottom: 5}}>
            {songMetaData?.title}
          </Text>
          <Text style={{color: COLORS.icon2, ...FONTS.p4, paddingBottom: 5}}>
            {songMetaData?.subtitle}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <SVG.ShazamLogoSVG width={15} height={15} fill={COLORS.icon2} />
            <Text style={{color: COLORS.darkgrey, ...FONTS.p5, paddingLeft: 5}}>
              {songShazamCount?.total} Shazams
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: 'rgba(212,212,212,0.13)',
            borderRadius: 100,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 3,
            marginBottom: 55,
          }}>
          <Ionicons name="play" size={28} color={COLORS.white1} />
        </TouchableOpacity>
      </View>

      <ApplePlayButton />
    </LinearGradient>
  );

  const renderFooter = () => (
    <View
      style={{
        backgroundColor: COLORS.black5,
        paddingVertical: 35,
        paddingHorizontal: 16,
        rowGap: 15,
      }}>
      <Text style={{...FONTS.h3, color: COLORS.white1, paddingBottom: 20}}>
        TRACK INFORMATION
      </Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.trackinfo__label}>Track :</Text>
        <Text style={styles.trackinfo__text}>{songMetaData?.title}</Text>
      </View>

      <View style={{height: 1, backgroundColor: COLORS.black6}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.trackinfo__label}>Album :</Text>
        <Text style={styles.trackinfo__text}>
          {songMetaData?.sections[0].metadata[0].text}
        </Text>
      </View>

      <View style={{height: 1, backgroundColor: COLORS.black6}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.trackinfo__label}>Label :</Text>
        <Text style={styles.trackinfo__text}>
          {songMetaData?.sections[0].metadata[1].text}
        </Text>
      </View>

      <View style={{height: 1, backgroundColor: COLORS.black6}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.trackinfo__label}>Released :</Text>
        <Text style={styles.trackinfo__text}>
          {songMetaData?.sections[0].metadata[2].text}
        </Text>
      </View>
    </View>
  );

  const shareButton = () => (
    <View
      style={{
        backgroundColor: COLORS.black1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35,
        paddingBottom: 90,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.blue1,
          paddingVertical: 13,
          paddingHorizontal: 100,
          borderRadius: 10,
        }}>
        <Text style={{color: COLORS.white1, ...FONTS.h3}}>Share song</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <ImageBackground
        source={{
          uri: songMetaData?.images?.background,
        }}
        resizeMode="cover"
        imageStyle={{
          width: SIZES.width,
          height: SIZES.height / 1.7,
        }}
        style={{backgroundColor: COLORS.black1}}>
        {/* Top Header */}
        {renderHeader()}

        <LinearGradient
          colors={[
            'rgba(0,0,0, 0)',
            'rgba(0,0,0, 0)',
            'rgba(0,0,0, 0.95)',
            'rgba(0,0,0, 1)',
            'rgba(0,0,0, 1)',
          ]}
          style={styles.linear__bottom}
        />

        <Animated.ScrollView
          bounces={false}
          scrollEventThrottle={16}
          onScroll={useAnimatedScrollHandler(event => {
            scrollY.value = event.contentOffset.y;
          })}>
          {renderItemTop()}

          <Animated.View layout={Layout}>
            {songMetaData?.artists[0].adamid && (
              <TrackTopSongs
                navigation={navigation}
                adamid={songMetaData?.artists[0].adamid}
              />
            )}
          </Animated.View>

          <Animated.View layout={Layout}>
            {songMetaData?.sections[2].youtubeurl && (
              <TrackYoutube url={songMetaData?.sections[2].youtubeurl} />
            )}
          </Animated.View>

          <Animated.View layout={Layout}>
            {newSongId && (
              <TrackRelatedSongs
                navigation={navigation}
                newSongId={newSongId}
              />
            )}
          </Animated.View>

          <Animated.View layout={Layout}>
            {renderFooter()}
            {shareButton()}
          </Animated.View>
        </Animated.ScrollView>
      </ImageBackground>
    </>
  );
};

export default SongDetails;

const styles = StyleSheet.create({
  header__container: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 106,
    borderWidth: 0.5,
  },

  header__text: {
    ...FONTS.m5,
    fontSize: 15,
    paddingLeft: 3,
    color: COLORS.white1,
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

  linear__bottom: {
    position: 'absolute',
    width: '100%',
    height: SIZES.height / 1.22,
    bottom: 0,
  },

  trackinfo__label: {...FONTS.m4, color: COLORS.darkgrey},

  trackinfo__text: {
    ...FONTS.m4,
    color: COLORS.white1,
    maxWidth: SIZES.width / 1.3,
    textAlign: 'right',
  },
});
