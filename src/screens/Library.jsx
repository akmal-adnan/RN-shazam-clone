import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

const Library = () => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View>
      <Text>Library</Text>
    </View>
  </SafeAreaView>
);

export default Library;
