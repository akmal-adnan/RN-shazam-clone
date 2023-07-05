import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS, FONTS, SIZES} from '../constants';

const Header2 = ({navigation, trackList, trackIndex}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + 10,
        ...styles.header__container,
      }}>
      <View style={styles.inside__container}>
        <TouchableOpacity
          style={{activeOpacity: 0.6, marginTop: -6}}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-down" size={30} color={COLORS.white1} />
        </TouchableOpacity>

        <View style={{alignItems: 'center', rowGap: 4}}>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.white1,
              ...FONTS.h3,
              maxWidth: SIZES.width / 1.3,
              textAlign: 'center',
            }}>
            {trackList[trackIndex]?.title}
          </Text>

          <Text
            style={{
              color: COLORS.white1,
              ...FONTS.m5,
              maxWidth: SIZES.width / 1.3,
            }}>
            {trackList[trackIndex]?.artist}
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.icon1} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header2;

const styles = StyleSheet.create({
  header__container: {
    paddingHorizontal: 16,
    position: 'absolute',
    width: SIZES.width,
    zIndex: 5,
  },

  inside__container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});
