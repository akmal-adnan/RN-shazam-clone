import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import {useSelector, useDispatch} from 'react-redux';
import {FONTS, COLORS, SIZES, SVG} from '../constants';
import {Header} from '../components';
import {useGetTopChartsQuery} from '../redux/services/ShazamCore';
import {setPlaying} from '../redux/features/playerSlices';
import FloatButton from '../components/FloatButton';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SubCharts = ({navigation, route}) => {
  const scrollY = useSharedValue(0);
  const {country, listid} = route.params;

  const {data} = useGetTopChartsQuery({
    listid,
    limitCount: 20,
  });

  const isPlaying = useSelector(state => state.player.isPlaying);
  const dispatch = useDispatch();

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

  const renderItem = ({item, index}) => {
    const imageUrl = item?.attributes?.artwork.url
      .replace('{w}', '400')
      .replace('{h}', '400');

    return (
      <Animated.View entering={FadeIn}>
        <TouchableOpacity
          onPress={() =>
            navigation.push('SongDetails', {songId: item?.id, listid})
          }
          onLongPress={() => console.log('Multiselect action')}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            paddingVertical: 16,
            paddingHorizontal: 16,
            position: 'relative',
          }}>
          <ImageBackground
            source={{
              uri: imageUrl,
            }}
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
              onPress={() => dispatch(setPlaying(!isPlaying))}
              activeOpacity={0.7}
              style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 100,
                padding: 14,
                marginTop: 10,
              }}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={18}
                color={COLORS.white1}
              />
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
                {item?.attributes.name}
              </Text>
              <Text numberOfLines={1} style={styles.song__subtitle}>
                {item?.attributes.artistName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  paddingHorizontal: 9,
                  paddingVertical: 5,
                  borderRadius: 20,
                  backgroundColor: COLORS.black6,
                  bottom: 0,
                }}>
                <SVG.AppleMusicSVG
                  width={50}
                  height={15}
                  fill={COLORS.white1}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} style={{marginRight: -5}}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color={COLORS.icon1}
                />
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
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.main__container}>
      <Header navigation={navigation} country={country} scrollY={scrollY} />

      <ReanimatedFlatList
        ListHeaderComponent={renderButton}
        contentContainerStyle={{paddingBottom: 50}}
        bounces={false}
        scrollEventThrottle={16}
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onScroll={useAnimatedScrollHandler(event => {
          scrollY.value = event.contentOffset.y;
        })}
      />

      {isPlaying && <FloatButton navigation={navigation} />}
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
