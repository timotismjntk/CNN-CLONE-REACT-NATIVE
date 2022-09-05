import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import Animated, {FadeInUp, FadeInDown} from 'react-native-reanimated';

import {windowWidth, windowHeight} from '../utils';

export default function NoResult({title = 'No Saved Articles Found'}) {
  const [finishAnimation, setFinishAnimation] = useState(false);
  useEffect(() => {
    return () => {
      if (finishAnimation) {
        setFinishAnimation(false);
      }
    };
  }, [finishAnimation]);

  return (
    <View style={styles.container}>
      <Lottie
        style={{height: windowWidth * 0.9, width: windowWidth * 0.9}}
        source={require('../assets/noresult.json')}
        loop={false}
        autoPlay
        autoSize
        onAnimationFinish={() => setFinishAnimation(true)}
      />
      {finishAnimation && (
        <Animated.Text
          entering={FadeInUp}
          exiting={FadeInDown}
          style={styles.title}>
          {title}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: windowHeight,
    backgroundColor: 'white',
  },
  title: {
    fontSize: windowWidth * 0.05,
    fontWeight: '500',
    color: 'black',
    top: -windowHeight * 0.05,
  },
});
