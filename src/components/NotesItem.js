import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

import {windowWidth} from '../utils';

export default function NotesItem({item}) {
  const navigation = useNavigation();
  return (
    <RectButton
      onPress={() => navigation.navigate('EditNotes', item)}
      style={styles.container}>
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <Text numberOfLines={1} style={styles.content}>
        {item.content}
      </Text>
      <Text numberOfLines={1} style={styles.editedAt}>
        {item.editedAt}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
    height: windowWidth * 0.2,
    backgroundColor: '#E5E5E5',
    marginBottom: '3%',
    borderRadius: windowWidth * 0.03,
    justifyContent: 'center',
    paddingHorizontal: '4%',
  },
  title: {
    fontSize: windowWidth * 0.046,
    fontWeight: '600',
    color: 'black',
  },
  content: {
    fontSize: windowWidth * 0.034,
    color: 'grey',
  },
  editedAt: {
    fontSize: windowWidth * 0.034,
    color: 'grey',
  },
});
