/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  BackHandler,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';
import {FlashList} from '@shopify/flash-list';

// import components
import SearchResultsItem from '../../components/SearchResultsItem';
import NoResult from '../../components/NoResult';

import {windowWidth, windowHeight} from '../../utils';
import {color} from '../../utils/theme';

import {
  searchNews,
  addRecentSearch,
  clearSearchResult,
} from '../../redux/reducer/search';

export default function SearchResults({navigation, route}) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(route?.params?.query || '');
  const {searchNews: data, isLoadingSearchNews} =
    useSelector(state => state.search) || {};
  useEffect(() => {
    dispatch(searchNews(route?.params?.query));
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        dispatch(clearSearchResult());
      },
    );

    return () => backHandler.remove();
  }, []);

  const onSearchNews = useCallback(() => {
    if (searchValue?.trim()?.length > 0) {
      dispatch(addRecentSearch(searchValue));
      dispatch(searchNews(searchValue));
    }
  }, [searchValue]);

  const memoizedArticle = useMemo(() => data?.articles || [], [data]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View style={styles.searchbarContainer}>
        <View style={styles.searchbar}>
          <MaterialIcons name="search" size={windowWidth * 0.09} color="grey" />
          <TextInput
            style={styles.searchbarinput}
            placeholder="Find it on TIMO..."
            value={searchValue}
            onChangeText={setSearchValue}
            onSubmitEditing={onSearchNews}
          />
        </View>
        <RectButton
          onPress={() => {
            setSearchValue('');
            dispatch(clearSearchResult());
            navigation.goBack();
          }}
          style={styles.cancelSearch}>
          <Text style={styles.cancelSearchPlaceHolder}>Cancel</Text>
        </RectButton>
      </View>
      {isLoadingSearchNews ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={color} />
        </View>
      ) : (
        <>
          <View style={styles.searchResultContainer}>
            <Text style={styles.searchResult}>
              {memoizedArticle?.length} Results for "{searchValue}"
            </Text>
          </View>
          <FlashList
            data={memoizedArticle}
            renderItem={({item, index}) => (
              <SearchResultsItem item={item} index={index} />
            )}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            estimatedItemSize={windowHeight * 0.05 + windowWidth}
            ListEmptyComponent={<NoResult title="No Results" />}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    borderRadius: windowWidth * 0.02,
    paddingHorizontal: '2%',
  },
  searchbarinput: {
    backgroundColor: 'white',
    flex: 1,
    color: 'grey',
    fontSize: windowWidth * 0.036,
  },
  cancelSearch: {
    paddingHorizontal: '3%',
    paddingVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelSearchPlaceHolder: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: windowWidth * 0.034,
    fontFamily: 'DMSans-Bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    borderWidth: windowHeight * 0.0005,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  searchResultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    backgroundColor: 'white',
  },
  searchResult: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: windowWidth * 0.035,
  },
  clearButton: {
    padding: '1%',
    marginRight: '2%',
  },
  clear: {
    color: color,
    fontSize: windowWidth * 0.034,
    fontFamily: 'DMSans-Bold',
  },
});
