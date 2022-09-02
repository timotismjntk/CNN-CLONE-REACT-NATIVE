import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addRecentSearch} from '../redux/reducer/search';

import {windowWidth} from '../utils';

export default function RecentSearch({item, index, navigation}) {
  const dispatch = useDispatch();

  return (
    <RectButton
      onPress={() => {
        navigation.navigate('SearchResults', {query: item});
        dispatch(addRecentSearch(item));
      }}
      style={styles.container}
      key={index}>
      <Text style={styles.title}>{item}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '4%',
    backgroundColor: 'white',
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: windowWidth * 0.036,
    fontWeight: 'bold',
  },
});
