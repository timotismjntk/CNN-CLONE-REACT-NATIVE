import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function FastImageComponent({source, style}) {
  if (source?.length === 0) {
    return null;
  }
  return (
    <FastImage
      style={[styles.image, style]}
      source={{uri: source, priority: FastImage.priority.high}}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
