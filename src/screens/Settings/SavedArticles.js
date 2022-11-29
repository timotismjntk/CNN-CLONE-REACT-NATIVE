import React, {useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RectButton} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';

// import components
import SavedArticleItem from '../../components/SavedArticleItem';
import NoResult from '../../components/NoResult';

import {windowWidth, windowHeight} from '../../utils';
import {color} from '../../utils/theme';

import {removeAllSavedArticles} from '../../redux/reducer/savedArticles';

export default function SavedArticles({navigation}) {
  const RectButtonAnimated = Animated.createAnimatedComponent(RectButton);
  const dispatch = useDispatch();
  const {savedArticles} = useSelector(state => state.savedArticles) || {};
  const listRef = useRef(null);

  const memoizedValue = useMemo(() => savedArticles || [], [savedArticles]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FlashList
        ref={listRef}
        data={memoizedValue}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={props => <SavedArticleItem {...props} />}
        keyExtractor={(item, index) => item?.author || index}
        estimatedItemSize={windowHeight * 0.3 * windowWidth * 0.9}
        ListEmptyComponent={NoResult}
      />
      {memoizedValue?.length > 0 && (
        <RectButtonAnimated
          entering={FadeIn.delay(memoizedValue?.length * 200)}
          exiting={FadeOut}
          style={styles.removeAllButton}>
          <MaterialIcons
            name="delete"
            size={windowWidth * 0.06}
            color="white"
            onPress={() => dispatch(removeAllSavedArticles())}
          />
        </RectButtonAnimated>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  separator: {
    borderWidth: windowHeight * 0.0005,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  removeAllButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: color,
    padding: '3%',
    borderRadius: windowWidth / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
