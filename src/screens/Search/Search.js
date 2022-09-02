/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useMemo, useCallback} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';

// import components
import RecentSearch from '../../components/RecentSearch';

import {windowWidth, windowHeight} from '../../utils';
import {color} from '../../utils/theme';

import {clearRecentSearch, addRecentSearch} from '../../redux/reducer/search';

export default function Search({navigation}) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const {recentSearches} = useSelector(state => state.search) || {};

  const memoizedValue = useMemo(() => recentSearches || [], [recentSearches]);

  const onSearchNews = useCallback(() => {
    if (searchValue?.trim()?.length > 0) {
      dispatch(addRecentSearch(searchValue));
      navigation.navigate('SearchResults', {query: searchValue});
    }
  }, [searchValue]);

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
          }}
          style={styles.cancelSearch}>
          <Text style={styles.cancelSearchPlaceHolder}>Cancel</Text>
        </RectButton>
      </View>
      <FlatList
        data={memoizedValue}
        renderItem={({item, index}) => (
          <RecentSearch item={item} index={index} navigation={navigation} />
        )}
        keyExtractor={(item, index) =>
          String(item?.publishedAt) + index?.toString()
        }
        ListHeaderComponent={
          <View style={styles.recentSearchContainer}>
            <Text style={styles.recentSearch}>Recent Searches</Text>
            <RectButton
              onPress={() => dispatch(clearRecentSearch())}
              style={styles.clearButton}>
              <Text style={styles.clear}>Clear</Text>
            </RectButton>
          </View>
        }
        contentContainerStyle={styles.flatlistContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: '600',
  },
  flatlistContainer: {
    width: '100%',
    // paddingHorizontal: windowWidth * 0.02,
  },
  recentSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    backgroundColor: '#efe9e5',
  },
  recentSearch: {
    color: 'grey',
    fontSize: windowWidth * 0.036,
    fontWeight: '500',
  },
  clearButton: {
    padding: '1%',
    marginRight: '2%',
  },
  clear: {
    color: color,
    fontSize: windowWidth * 0.034,
    fontWeight: '500',
  },
});
