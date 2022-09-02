import React, {useEffect, useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

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

  const memoizedValue = useMemo(() => data?.articles || [], [data]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FlatList
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.08,
    paddingTop: '3%',
  },
});
