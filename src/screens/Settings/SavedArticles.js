import React, {useMemo} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

// import components
import SavedArticleItem from '../../components/SavedArticleItem';
import NoResult from '../../components/NoResult';

import {windowWidth, windowHeight} from '../../utils';

export default function SavedArticles({navigation}) {
  const {savedArticles} = useSelector(state => state.savedArticles) || {};

  const memoizedValue = useMemo(() => savedArticles || [], [savedArticles]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FlatList
        data={memoizedValue}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={props => (
          <SavedArticleItem {...props} navigation={navigation} />
        )}
        ListEmptyComponent={NoResult}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderWidth: windowHeight * 0.0005,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
