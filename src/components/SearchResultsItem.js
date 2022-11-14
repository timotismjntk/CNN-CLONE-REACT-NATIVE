/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth, windowHeight} from '../utils';
import {color} from '../utils/theme';

// import components
import FastImageComponent from './FastImageComponent';

export default function SearchResultsItem({item, index}) {
  return (
    <RectButton
      onPress={() => Linking.openURL(item.url)}
      rippleColor={color}
      style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.titleAndDateWrapper}>
          <Text style={styles.title}>{item?.title || ''}</Text>
          <Text style={styles.publishedAt}>
            {(item?.publishedAt &&
              new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(item?.publishedAt))) ||
              ''}
          </Text>
        </View>
        <View style={styles.imageWrapper}>
          <FastImageComponent
            source={item.urlToImage}
            style={{resizeMode: 'center'}}
          />
        </View>
        <MaterialIcons
          name="menu-book"
          size={windowWidth * 0.05}
          color="rgba(0,0,0,0.6)"
        />
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: '3.5%',
    paddingVertical: '3%',
    flex: 1,
    minHeight: windowHeight * 0.13,
    width: '100%',
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: windowWidth * 0.036,
  },
  titleAndDateWrapper: {
    flex: 1,
    paddingRight: '2%',
  },
  imageWrapper: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.1,
    marginRight: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishedAt: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: windowWidth * 0.028,
    marginTop: '3%',
  },
  button: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: 10,
    borderRadius: 10,
  },
});
