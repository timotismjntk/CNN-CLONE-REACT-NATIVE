import React from 'react';
import {StyleSheet, Image, Text, View, Linking} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth} from '../utils';
import {color} from '../utils/theme';

export default function SearchResultsItem({item, index}) {
  return (
    <RectButton
      onPress={() => Linking.openURL(item.url)}
      rippleColor={color}
      style={styles.container}
      key={index}>
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
          <Image style={styles.image} source={{uri: item?.urlToImage}} />
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
    width: windowWidth * 0.18,
    height: windowWidth * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
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
