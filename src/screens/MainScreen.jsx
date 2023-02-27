import React, {useRef, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Home from './Home';
import Charts from './Charts';
import Library from './Library';
import {COLORS, SIZES} from '../constants/theme';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SCREEN = [
  {key: 'library', component: <Library />},
  {key: 'home', component: <Home />},
  {key: 'charts', component: <Charts />},
];

const PageIndicator = ({data, scrollX}) => (
  <View style={{flexDirection: 'row'}}>
    {data.map((item, i) => {
      const inputRange = [
        (i - 1) * SIZES.width,
        i * SIZES.width,
        (i + 1) * SIZES.width,
      ];

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dotWidth = useAnimatedStyle(() => {
        const animatedIndicator = interpolate(
          scrollX.value,
          inputRange,
          [8, 20, 8],
          Extrapolate.CLAMP,
        );
        return {width: animatedIndicator};
      });

      return <Animated.View style={[styles.dot, dotWidth]} key={item.key} />;
    })}
  </View>
);

const MainScreen = () => {
  const slidesRef = useRef();
  const scrollX = useSharedValue(393);

  useEffect(() => {
    slidesRef.current.scrollToIndex({index: 1, animated: false});
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
      </View>
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
    top: SIZES.height / 11,
  },

  dot: {
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.icon1,
    marginHorizontal: 3.5,
  },
});
