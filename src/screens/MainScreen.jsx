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
import {COLORS, SIZES} from '../constants';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
          [6, 15, 6],
          Extrapolate.CLAMP,
        );
        return {width: animatedIndicator};
      });

      return <Animated.View style={[styles.dot, dotWidth]} key={item.key} />;
    })}
  </View>
);

const MainScreen = ({navigation}) => {
  const slidesRef = useRef();
  const scrollX = useSharedValue(393);

  const SCREEN = [
    {
      key: 'library',
      component: <Library navigation={navigation} slidesRef={slidesRef} />,
    },
    {
      key: 'home',
      component: <Home navigation={navigation} slidesRef={slidesRef} />,
    },
    {
      key: 'charts',
      component: <Charts navigation={navigation} slidesRef={slidesRef} />,
    },
  ];

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
    top: SIZES.height / 12,
  },

  dot: {
    height: 6,
    borderRadius: 10,
    backgroundColor: COLORS.white1,
    marginHorizontal: 3.5,
  },
});
