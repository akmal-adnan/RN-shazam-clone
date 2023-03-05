import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const COLORS = {
  white1: '#FFFFFF',
  white2: '#E4E4E4',
  black1: '#000000',
  black2: '#121212',
  icon1: '#D4D4D4',
  icon2: '#949494',
  blue1: '#0088FE',
  blue2: '#005CCB',
  blue3: '#066AFE',
  blue4: '#00BAFF',
  black3: '#010914',
  black4: '#000F14',
  purple: '#6E5599',
  darkgrey: '#656565',
  lightgrey: '#E4E4E4',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 16,
  h5: 14,
  body1: 30,
  body2: 22,
  body3: 18,
  body4: 16,
  body5: 14,

  // app dimensions
  width,
  height,
};

// prettier-ignore
export const FONTS = {
  largeTitle: {fontFamily: 'NeueMontreal-Bold', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'NeueMontreal-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'NeueMontreal-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'NeueMontreal-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'NeueMontreal-Bold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'NeueMontreal-Bold', fontSize: SIZES.h5, lineHeight: 22},

  p1: {fontFamily: 'NeueMontreal-Regular', fontSize: SIZES.body1, lineHeight: 36},
  p2: {fontFamily: 'NeueMontreal-Regular', fontSize: SIZES.body2, lineHeight: 30},
  p3: {fontFamily: 'NeueMontreal-Regular', fontSize: SIZES.body3, lineHeight: 22},
  p4: {fontFamily: 'NeueMontreal-Regular', fontSize: SIZES.body4, lineHeight: 22},
  p5: {fontFamily: 'NeueMontreal-Regular', fontSize: SIZES.body5, lineHeight: 22},

  m1: {fontFamily: 'NeueMontreal-Medium', fontSize: SIZES.body1, lineHeight: 36},
  m2: {fontFamily: 'NeueMontreal-Medium', fontSize: SIZES.body2, lineHeight: 30},
  m3: {fontFamily: 'NeueMontreal-Medium', fontSize: SIZES.body3, lineHeight: 22},
  m4: {fontFamily: 'NeueMontreal-Medium', fontSize: SIZES.body4, lineHeight: 22},
  m5: {fontFamily: 'NeueMontreal-Medium', fontSize: SIZES.body5, lineHeight: 22},

  l1: {fontFamily: 'NeueMontreal-Light', fontSize: SIZES.body1, lineHeight: 36},
  l2: {fontFamily: 'NeueMontreal-Light', fontSize: SIZES.body2, lineHeight: 30},
  l3: {fontFamily: 'NeueMontreal-Light', fontSize: SIZES.body3, lineHeight: 22},
  l4: {fontFamily: 'NeueMontreal-Light', fontSize: SIZES.body4, lineHeight: 22},
  l5: {fontFamily: 'NeueMontreal-Light', fontSize: SIZES.body5, lineHeight: 22},
};

export default {COLORS, SIZES, FONTS};
