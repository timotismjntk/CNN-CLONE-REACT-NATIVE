import React, {useEffect, useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth, windowHeight} from '../../utils';

// import action reducer
import {businessNews} from '../../redux/reducer/news';
import {color} from '../../utils/theme';

// import components
import News from '../../components/News';

export default function Business({navigation}) {
  const dispatch = useDispatch();
  const {businessNews: data, isLoadingBusinessNews} =
    useSelector(state => state.news) || {};

  useEffect(() => {
    dispatch(businessNews());
  }, []);

  const memoizedValue = useMemo(() => data?.articles || [], [data]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FlatList
        data={memoizedValue}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingBusinessNews}
            onRefresh={() => {
              dispatch(businessNews());
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
