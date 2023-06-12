/* eslint-disable react-hooks/rules-of-hooks */
import React, {useRef, useEffect} from 'react';
import {View, FlatList, StyleSheet, StatusBar, Platform} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
  interpolateColor,
} from 'react-native-reanimated';
import Home from './Home';
import Charts from './Charts';
import Library from './Library';
import {COLORS, SIZES} from '../constants';
import FloatButton from '../components/FloatButton';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PageIndicator = ({data, scrollX}) => (
  <View style={{flexDirection: 'row'}}>
    {data.map((item, i) => {
      const inputRange = [
        (i - 1) * SIZES.width,
        i * SIZES.width,
        (i + 1) * SIZES.width,
      ];

      const dotWidth = useAnimatedStyle(() => {
        const animatedIndicator = interpolate(
          scrollX.value,
          inputRange,
          [6, 7, 6],
          Extrapolate.CLAMP,
        );
        return {width: animatedIndicator};
      });

      const bgColor = useAnimatedStyle(() => {
        const animatedIndicator = interpolateColor(
          scrollX.value,
          [0, 393, 780],
          ['#B4B4B4', COLORS.icon1, '#B4B4B4'],
        );
        return {
          backgroundColor: animatedIndicator,
        };
      });

      return (
        <Animated.View style={[styles.dot, dotWidth, bgColor]} key={item.key} />
      );
    })}
  </View>
);

const TheDot = ({scrollX}) => {
  const dotMoving = useAnimatedStyle(() => {
    const animatedIndicator = interpolate(
      scrollX.value,
      [0, 393, 780],
      [0, 13, 26],
      Extrapolate.CLAMP,
    );

    return {transform: [{translateX: animatedIndicator}]};
  });

  const bgColor = useAnimatedStyle(() => {
    const animatedIndicator = interpolateColor(
      scrollX.value,
      [0, 393, 780],
      [COLORS.blue1, COLORS.white1, COLORS.blue3],
    );
    return {
      backgroundColor: animatedIndicator,
    };
  });

  return (
    <View style={{position: 'absolute', width: '100%'}}>
      <Animated.View style={[dotMoving, bgColor, styles.dot__moving]} />
    </View>
  );
};

const MainScreen = ({navigation, route}) => {
  const slidesRef = useRef();
  const scrollX = useSharedValue(393);

  const SCREEN = [
    {
      key: 'library',
      component: <Library navigation={navigation} slidesRef={slidesRef} />,
    },
    {
      key: 'home',
      component: (
        <Home navigation={navigation} slidesRef={slidesRef} route={route} />
      ),
    },
    {
      key: 'charts',
      component: <Charts navigation={navigation} slidesRef={slidesRef} />,
    },
  ];

  useEffect(() => {
    slidesRef.current?.scrollToIndex({index: 1, animated: false});
  }, []);

  const scrollFailed = () => {
    const wait = new Promise(resolve => {
      setTimeout(resolve, 10);
    });

    wait.then(() => {
      slidesRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
    });
  };

  const renderItem = ({item}) => (
    <View style={{width: SIZES.width, height: SIZES.height}}>
      {item.component}
    </View>
  );

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <ReanimatedFlatList
        ref={slidesRef}
        bounces={false}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={SCREEN}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        onScrollToIndexFailed={scrollFailed}
        onScroll={useAnimatedScrollHandler(event => {
          scrollX.value = event.contentOffset.x;
        })}
      />

      <View style={styles.indicator__container}>
        <PageIndicator data={SCREEN} scrollX={scrollX} />
        <TheDot data={SCREEN} scrollX={scrollX} />
      </View>

      <FloatButton navigation={navigation} />
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  indicator__container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? SIZES.height / 10 : SIZES.height / 12.5,
  },

  dot: {
    height: 6,
    borderRadius: 10,
    marginHorizontal: 3.5,
  },

  dot__moving: {
    height: 7,
    width: 7,
    borderRadius: 10,
    marginHorizontal: 3.5,
  },
});
