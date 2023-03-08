import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, DATA, SIZES, SVG} from '../constants';

const SongDetails = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const [data] = useState(DATA.TrackDetails[0]);

  const numberWithComma = x =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const animateHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [250, 413],
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
      [405, 418],
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
          style={[titileOpacity, {...styles.header__text, paddingLeft: 18}]}>
          {data?.title}
        </Animated.Text>
      </View>

      <Animated.View
        style={[iconOpacity, {flexDirection: 'row', alignItems: 'center'}]}>
        <TouchableOpacity
          onPress={() => console.log('hi')}
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
      colors={['rgba(0,0,0, 0.4)', 'rgba(0,0,0, 0.98)']}
      style={{
        height: SIZES.height / 1.45,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
      }}>
      <View>
        <Text style={{color: COLORS.white1, ...FONTS.h1, paddingBottom: 5}}>
          {data?.title}
        </Text>
        <Text style={{color: COLORS.icon2, ...FONTS.p4, paddingBottom: 5}}>
          {data?.subtitle}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <SVG.ShazamLogoSVG width={15} height={15} fill={COLORS.icon2} />
          <Text style={{color: COLORS.darkgrey, ...FONTS.p5, paddingLeft: 5}}>
            {numberWithComma(data?.key)} Shazams
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
    </LinearGradient>
  );

  const renderAppleButton = () => (
    <View style={{backgroundColor: COLORS.black1, paddingVertical: 30}}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          backgroundColor: COLORS.blue1,
          paddingVertical: 5,
          paddingHorizontal: 7,
          borderRadius: 50,
        }}>
        <View
          style={{
            backgroundColor: COLORS.peach,
            padding: 8,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: COLORS.white1,
            ...styles.shadow,
          }}>
          <Ionicons
            name="musical-notes-sharp"
            size={20}
            color={COLORS.white1}
          />
        </View>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.white1,
            alignSelf: 'center',
            paddingHorizontal: 10,
          }}>
          PLAY FULL SONG
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: COLORS.white1,
          ...FONTS.m4,
          alignSelf: 'center',
          paddingTop: 8,
        }}>
        Get up to 1 month free of Apple Music
      </Text>
    </View>
  );

  const renderTopSongs = () => (
    <View style={{backgroundColor: COLORS.black1, paddingTop: 25}}>
      <Text
        style={{
          color: COLORS.white1,
          ...FONTS.h3,
          marginBottom: 30,
          paddingHorizontal: 16,
        }}>
        TOP SONGS
      </Text>
      <ScrollView horizontal bounces={false}>
        <View
          style={{
            flexWrap: 'wrap',
            height: SIZES.height / 1.8,
            paddingHorizontal: 16,
            rowGap: 35,
            columnGap: 15,
          }}>
          {DATA?.FeaturedSongs?.data[0].views['top-songs'].data.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                width: SIZES.width / 1.16,
              }}>
              <ImageBackground
                source={{
                  uri: item.attributes.artwork.url
                    .replace('{w}', 300)
                    .replace('{h}', 300),
                }}
                resizeMode="contain"
                imageStyle={{
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: COLORS.darkgrey,
                }}
                style={{
                  width: SIZES.width / 3.3,
                  height: SIZES.width / 3.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 100,
                    padding: 15,
                  }}>
                  <Ionicons name="play" size={28} color={COLORS.white1} />
                </TouchableOpacity>
              </ImageBackground>

              <View style={{marginLeft: 16, gap: 5}}>
                <Text
                  numberOfLines={1}
                  style={{
                    ...FONTS.h3,
                    color: COLORS.white1,
                    width: SIZES.width / 2.5,
                  }}>
                  {item.attributes.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...FONTS.m3,
                    color: COLORS.white1,
                    width: SIZES.width / 2.5,
                  }}>
                  {item.attributes.artistName}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    paddingHorizontal: 9,
                    paddingVertical: 5,
                    borderRadius: 20,
                    position: 'absolute',
                    backgroundColor: COLORS.black6,
                    bottom: 0,
                  }}>
                  <SVG.AppleMusicSVG
                    width={50}
                    height={15}
                    fill={COLORS.white1}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderVideo = () => (
    <View style={{backgroundColor: COLORS.black5, paddingVertical: 35}}>
      <Text
        style={{
          color: COLORS.white1,
          ...FONTS.h3,
          paddingBottom: 20,
          paddingHorizontal: 16,
        }}>
        VIDEO
      </Text>

      <ImageBackground
        source={{uri: DATA.TrackYoutube[0].image.url}}
        resizeMode="contain"
        imageStyle={{borderRadius: 10}}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: SIZES.width / 1.1,
          height: SIZES.width / 1.95,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 30,
            width: 40,
            position: 'absolute',
          }}
        />
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialCom name="youtube" size={80} color="#FE0000" />
        </TouchableOpacity>
      </ImageBackground>

      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 25,
          paddingBottom: 10,
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.white1,
            width: SIZES.width / 1.4,
            ...FONTS.h4,
          }}>
          {DATA.TrackYoutube[0].caption}
        </Text>
      </View>
    </View>
  );

  const renderRelatedSongs = () => (
    <View style={{backgroundColor: COLORS.black1, paddingVertical: 35}}>
      <Text
        style={{
          color: COLORS.white1,
          ...FONTS.h3,
          paddingBottom: 20,
          paddingHorizontal: 16,
        }}>
        YOU MAY ALSO LIKE
      </Text>

      <FlatList
        horizontal
        bounces={false}
        data={DATA.TrackRelated.slice(0, 10)}
        renderItem={renderList}
        keyExtractor={item => item.key}
      />
    </View>
  );

  const renderList = ({item, index}) => (
    <View style={{paddingLeft: index === 0 ? 16 : 0, paddingRight: 16}}>
      <ImageBackground
        source={{
          uri: item?.images?.coverart,
        }}
        resizeMode="contain"
        imageStyle={{
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: COLORS.darkgrey,
        }}
        style={{
          width: SIZES.width / 2.55,
          height: SIZES.width / 2.55,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 100,
            padding: 15,
          }}>
          <Ionicons name="play" size={28} color={COLORS.white1} />
        </TouchableOpacity>
      </ImageBackground>
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.m3,
          color: COLORS.white1,
          width: 100,
          paddingTop: 10,
          paddingBottom: 5,
        }}>
        {item.title}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.p4,
          color: COLORS.white1,
          width: 100,
          paddingBottom: 20,
        }}>
        {item.subtitle}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          paddingHorizontal: 9,
          paddingVertical: 5,
          borderRadius: 20,
          backgroundColor: COLORS.black6,
          alignSelf: 'flex-start',
        }}>
        <SVG.AppleMusicSVG width={50} height={15} fill={COLORS.white1} />
      </TouchableOpacity>
    </View>
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
        <Text style={{...FONTS.m4, color: COLORS.darkgrey}}>Track :</Text>
        <Text style={{...FONTS.m4, color: COLORS.white1}}>{data.title}</Text>
      </View>

      <View style={{height: 1, backgroundColor: COLORS.black6}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...FONTS.m4, color: COLORS.darkgrey}}>Album :</Text>
        <Text style={{...FONTS.m4, color: COLORS.white1}}>
          {data.sections[0]?.metadata[0]?.text}
        </Text>
      </View>

      <View style={{height: 1, backgroundColor: COLORS.black6}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...FONTS.m4, color: COLORS.darkgrey}}>Label :</Text>
        <Text style={{...FONTS.m4, color: COLORS.white1}}>
          {data.sections[0]?.metadata[1]?.text}
        </Text>
      </View>

      <View style={{height: 1, backgroundColor: COLORS.black6}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...FONTS.m4, color: COLORS.darkgrey}}>Released :</Text>
        <Text style={{...FONTS.m4, color: COLORS.white1}}>
          {data.sections[0]?.metadata[2]?.text}
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
          paddingVertical: 15,
          paddingHorizontal: 100,
          borderRadius: 10,
        }}>
        <Text style={{color: COLORS.white1, ...FONTS.h3}}>Share song</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: data?.images?.background,
      }}
      resizeMode="cover"
      imageStyle={{
        width: SIZES.width,
        height: SIZES.height / 1.5,
      }}
      style={{backgroundColor: COLORS.black1}}>
      {/* Top Header */}
      {renderHeader()}

      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={useAnimatedScrollHandler(event => {
          scrollY.value = event.contentOffset.y;
        })}>
        {renderItemTop()}
        {renderAppleButton()}
        {renderTopSongs()}
        {renderVideo()}
        {renderRelatedSongs()}
        {renderFooter()}
        {shareButton()}
      </Animated.ScrollView>
    </ImageBackground>
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
});
