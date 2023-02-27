import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants/theme';

const Home = () => (
  <SafeAreaView
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.blue4,
    }}>
    <View>
      <Text style={{...FONTS.m1}}>Tap to Shazam</Text>
    </View>
  </SafeAreaView>
);

export default Home;
