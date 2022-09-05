import React, {useEffect, useMemo} from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

import {windowWidth, windowHeight} from '../../utils';

// import action reducer
import {generalNews} from '../../redux/reducer/news';
import {color} from '../../utils/theme';

// import components
import News from '../../components/News';

export default function General({navigation}) {
  const dispatch = useDispatch();
  const {generalNews: data, isLoadingGeneralNews} =
    useSelector(state => state.news) || {};

  useEffect(() => {
    dispatch(generalNews());
  }, []);

  const memoizedValue = useMemo(() => data?.articles || [], [data]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FlashList
        data={memoizedValue}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingGeneralNews}
            onRefresh={() => {
              dispatch(generalNews());
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
        estimatedItemSize={windowWidth * 0.7}
        renderItem={props => <News {...props} />}
        keyExtractor={(item, index) =>
          String(item?.publishedAt) + index?.toString()
        }
        contentContainerStyle={styles.flatlistContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    paddingTop: '3%',
  },
});
