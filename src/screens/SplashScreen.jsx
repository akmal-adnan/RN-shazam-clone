import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainScreen');
    }, 1000);
  }, [navigation]);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
