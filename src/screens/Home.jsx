import {View, Text, Button} from 'react-native';
import React from 'react';

const Home = ({navigation}) => (
  <View>
    <Text>Home</Text>
    <Button
      onPress={() => navigation.push('Charts')}
      title="Learn More"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
);

export default Home;
