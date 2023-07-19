import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FONTS, COLORS} from '../constants';

const ApplePlayButton = ({Bgcolor, buttonColor}) => (
  <View style={{paddingVertical: 30, backgroundColor: Bgcolor}}>
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        ...styles.apple__button,
        backgroundColor: buttonColor || 'rgba(101,101,101,0.5)',
      }}>
      <View style={[styles.icon__music, styles.shadow]}>
        <Ionicons name="musical-notes-sharp" size={20} color={COLORS.white1} />
      </View>

      <Text style={styles.text__play}>PLAY FULL SONG</Text>
    </TouchableOpacity>

    <Text style={styles.text__desc}>Get up to 1 month free of Apple Music</Text>
  </View>
);

export default ApplePlayButton;
const styles = StyleSheet.create({
  apple__button: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 50,
  },

  icon__music: {
    backgroundColor: COLORS.peach,
    padding: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.white1,
  },

  text__play: {
    ...FONTS.h4,
    color: COLORS.white1,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },

  text__desc: {
    color: COLORS.white1,
    ...FONTS.m4,
    alignSelf: 'center',
    paddingTop: 8,
  },
});
