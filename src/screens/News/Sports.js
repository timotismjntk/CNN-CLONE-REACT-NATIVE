import React, {useEffect, useMemo} from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

import {windowWidth, windowHeight} from '../../utils';
import {color} from '../../utils/theme';

// import action reducer
import {sportNews} from '../../redux/reducer/news';

// import components
import News from '../../components/News';

export default function Sports({navigation}) {
  const dispatch = useDispatch();
  const {sportNews: data, isLoadingSportNews} =
    useSelector(state => state.news) || {};

  useEffect(() => {
    dispatch(sportNews());
  }, []);

  const memoizedValue = useMemo(() => {
    if (Array.isArray(data?.articles)) {
      return data?.articles;
    } else {
      return [];
    }
  }, [data]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FlashList
        data={memoizedValue}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingSportNews}
            onRefresh={() => {
              dispatch(sportNews());
            }}
            colors={[
              color,
              'yellow',
              '#0099e5',
              '#34bf49',
              '#000000',
              '#6a737b',
              '#fc636b',
            ]}
          />
        }
        estimatedItemSize={windowWidth * 0.94 + windowWidth * 0.7}
        renderItem={props => <News {...props} />}
        keyExtractor={(item, index) => String(item?.url || index)}
        contentContainerStyle={styles.flatlistContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatlistContainer: {
    paddingTop: 10,
  },
});
