import React from 'react';
import {StyleSheet, Text, View, Image, Linking} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Animated, {
  SlideInLeft,
  Layout,
  SlideOutLeft,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {removeSavedArticleById} from '../redux/reducer/savedArticles';

import {windowWidth} from '../utils';

export default function SavedArticleItem({item, index, navigation}) {
  const dispatch = useDispatch();
  const RectButtonAnimated = Animated.createAnimatedComponent(RectButton);
  return (
    <RectButtonAnimated
      entering={SlideInLeft.delay(index * 100)}
      exiting={SlideOutLeft}
      layout={Layout.springify()}
      onPress={() => Linking.openURL(item.url)}
      style={styles.container}
      key={index}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item?.urlToImage}} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{item?.title || ''}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.savedOn}>
            {item?.savedAt && `Saved on  ${item?.savedAt}`}
          </Text>
          <MaterialIcons
            name="delete"
            size={windowWidth * 0.062}
            color="black"
            onPress={() => dispatch(removeSavedArticleById(index))}
          />
        </View>
      </View>
    </RectButtonAnimated>
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
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  savedOn: {
    color: 'grey',
    fontSize: windowWidth * 0.032,
    marginTop: '1%',
  },
});
