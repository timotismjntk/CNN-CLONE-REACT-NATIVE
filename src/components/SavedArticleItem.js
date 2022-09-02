import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addRecentSearch} from '../redux/reducer/search';

import {windowWidth} from '../utils';

export default function SavedArticleItem({item, index, navigation}) {
  const dispatch = useDispatch();

  return (
    <RectButton
      onPress={() => {
        navigation.navigate('SearchResults', {query: item});
        dispatch(addRecentSearch(item));
      }}
      style={styles.container}
      key={index}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item?.urlToImage}} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{item?.title || ''}</Text>
        {item?.savedAt && (
          <Text style={styles.savedOn}>Saved on {item?.savedAt || ''}</Text>
        )}
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '4%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    paddingLeft: '3%',
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: windowWidth * 0.04,
    fontWeight: '500',
  },
  imageContainer: {
    width: windowWidth * 0.27,
    height: windowWidth * 0.2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  savedOn: {
    color: 'grey',
    fontSize: windowWidth * 0.032,
    marginTop: '1%',
  },
});
