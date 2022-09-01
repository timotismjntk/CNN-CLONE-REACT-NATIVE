import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth} from '../utils';

export default function News({item, index}) {
  return (
    <View key={index} style={styles.container}>
      <View style={styles.imageHeaderWrapper}>
        {item.urlToImage?.length > 0 ? (
          <Image
            resizeMethod="resize"
            style={styles.imageHeader}
            source={{uri: item.urlToImage}}
          />
        ) : (
          <Text style={styles.noImage}>No Image</Text>
        )}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
      <View style={styles.authorWrapper}>
        <Text style={styles.author}>{item?.source?.name || ''}</Text>
        <View style={styles.iconWrapper}>
          <MaterialIcons
            name="bookmark-outline"
            size={windowWidth * 0.065}
            color="grey"
            onPress={() => console.log('1')}
          />
          <MaterialIcons name="share" size={windowWidth * 0.06} color="grey" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.94,
    height: windowWidth * 0.7,
    backgroundColor: 'white',
    marginBottom: '3%',
    elevation: 3,
    borderRadius: windowWidth * 0.01,
  },
  imageHeaderWrapper: {
    height: windowWidth * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHeader: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    color: 'grey',
    fontSize: windowWidth * 0.1,
  },
  titleWrapper: {
    position: 'absolute',
    width: windowWidth * 0.94,
    paddingHorizontal: '3%',
    bottom: 0,
    paddingBottom: '3%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: windowWidth * 0.058,
    fontWeight: '500',
  },
  authorWrapper: {
    height: windowWidth * 0.1,
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  author: {
    color: 'red',
    fontSize: windowWidth * 0.036,
  },
  iconWrapper: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    justifyContent: 'space-between',
  },
});
