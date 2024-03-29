import AppleMusicSVG from '../assets/images/apple-music.svg';
import ShazamLogoSVG from '../assets/images/shazam-logo.svg';
import ShazamLogo2SVG from '../assets/images/shazam-translucent.svg';

const AppleMusic = require('../assets/images/apple-music.png');
const ShazamLogo = require('../assets/images/shazam-logo.png');
const ShazamLogo2 = require('../assets/images/shazam-translucent.png');
const WorldMap = require('../assets/images/world-map.jpg');
const ChartsIcon = require('../assets/images/charts.png');

const SoundBar = require('../assets/animations/icon_equalizer.json');
const SoundBarWhite = require('../assets/animations/icon_equalizer_white.json');
const Loading = require('../assets/animations/loading.json');
const WaveLoading = require('../assets/animations/wave_loading.json');

export const IMAGES = {
  AppleMusic,
  ShazamLogo,
  ShazamLogo2,
  WorldMap,
  ChartsIcon,
};

export const SVG = {
  AppleMusicSVG,
  ShazamLogoSVG,
  ShazamLogo2SVG,
};

export const LOTTIE = {
  SoundBar,
  SoundBarWhite,
  Loading,
  WaveLoading,
};

export default {IMAGES, SVG, LOTTIE};
