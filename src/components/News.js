import React, {useCallback} from 'react';
import {StyleSheet, Linking, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import {windowWidth} from '../utils';
import {color} from '../utils/theme';

// import action redux;
import {addSavedArticle} from '../redux/reducer/savedArticles';

// import components;
import FastImageComponent from './FastImageComponent';

export default function News({item, index}) {
  const dispatch = useDispatch();
  const {savedArticles} = useSelector(state => state.savedArticles) || {};

  const isSaved = useCallback(() => {
    return savedArticles.find(
      article =>
        article.title === item.title &&
        article.publishedAt === item.publishedAt,
    );
  }, [savedArticles, item]);

  return (
    <View style={styles.container}>
      <RectButton
        onPress={() => Linking.openURL(item.url)}
        rippleColor={color}
        style={styles.button}
      />
      <View style={styles.imageHeaderWrapper}>
        {item.urlToImage?.length > 0 ? (
          <FastImageComponent source={item.urlToImage} />
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
          <RectButton
            style={styles.bookmarkButton}
            onPress={() => {
              dispatch(
                addSavedArticle({
                  ...item,
                  savedAt: new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(new Date()),
                }),
              );
              Toast.show({
                type: 'success',
                text1: 'Succes',
                text2: isSaved()
                  ? 'Article has been removed'
                  : 'Article has been added',
              });
            }}>
            <MaterialIcons
              name={isSaved() ? 'bookmark' : 'bookmark-outline'}
              size={windowWidth * 0.065}
              color={isSaved() ? color : 'grey'}
            />
          </RectButton>
          <View />
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
    alignSelf: 'center',
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
  button: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    zIndex: 5,
  },
  bookmarkButton: {
    position: 'absolute',
    zIndex: 10,
  },
  noImage: {
    color: 'grey',
    fontSize: windowWidth * 0.1,
  },
  titleWrapper: {
    position: 'absolute',
    height: '100%',
    width: windowWidth * 0.94,
    paddingHorizontal: '3%',
    paddingBottom: '3%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: windowWidth * 0.054,
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
    color: color,
    fontSize: windowWidth * 0.036,
  },
  iconWrapper: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    justifyContent: 'space-between',
  },
});
