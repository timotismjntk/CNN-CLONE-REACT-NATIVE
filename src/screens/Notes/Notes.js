/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import {DragSortableView} from 'react-native-drag-sort';

// import components
import NotesItem from '../../components/NotesItem';
import NoResult from '../../components/NoResult';

import {windowWidth, windowHeight} from '../../utils';
import {color} from '../../utils/theme';

// import action redux;
import {sortNotesByDragnDrop} from '../../redux/reducer/notes';

export default function Notes({navigation}) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const {notes} = useSelector(state => state.notes) || {};

  const memoizedValue = useMemo(() => {
    if (Array.isArray(notes)) {
      if (searchValue?.trim()?.length > 0) {
        return notes?.filter(note => note?.title?.includes(searchValue));
      } else {
        return notes;
      }
    } else {
      return [];
    }
  }, [notes, searchValue]);

  const onSearchNews = useCallback(() => {
    if (searchValue?.trim()?.length > 0) {
      //   dispatch(addRecentSearch(searchValue));
      navigation.navigate('SearchResults', {query: searchValue});
    }
  }, [searchValue]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View
        style={[
          styles.searchbarContainer,
          {marginBottom: memoizedValue?.length > 0 ? '6%' : 0},
        ]}>
        <View style={styles.searchbar}>
          <MaterialIcons name="search" size={windowWidth * 0.09} color="grey" />
          <TextInput
            style={styles.searchbarinput}
            placeholder="Find notes..."
            value={searchValue}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onChangeText={setSearchValue}
            onSubmitEditing={onSearchNews}
          />
        </View>
        {inputFocused && (
          <RectButton
            onPress={() => {
              setSearchValue('');
            }}
            style={styles.cancelSearch}>
            <Text style={styles.cancelSearchPlaceHolder}>Cancel</Text>
          </RectButton>
        )}
      </View>
      <ScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={{paddingHorizontal: windowWidth * 0.03}}>
        <DragSortableView
          dataSource={memoizedValue}
          parentWidth={windowWidth}
          childrenWidth={windowWidth}
          childrenHeight={windowWidth * 0.18}
          marginChildrenBottom={windowHeight * 0.03}
          scaleStatus={'scaleY'}
          onDragStart={(startIndex, endIndex) => {
            setScrollEnabled(false);
          }}
          onDragEnd={startIndex => {
            setScrollEnabled(true);
          }}
          delayLongPress={0}
          onDataChange={data => {
            dispatch(sortNotesByDragnDrop(data));
          }}
          keyExtractor={(item, index) => item.id}
          onClickItem={(data, item, index) => {}}
          renderItem={(item, index) => {
            return <NotesItem item={item} />;
          }}
        />
        {memoizedValue?.length === 0 && (
          <NoResult
            title={
              searchValue?.length === 0
                ? 'You have no notes!'
                : 'No search results!'
            }
          />
        )}
      </ScrollView>
      <RectButton
        onPress={() => navigation.navigate('AddNotes')}
        style={styles.floatingButton}>
        <MaterialIcons name="add" size={windowWidth * 0.09} color="white" />
      </RectButton>
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
  floatingButton: {
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    borderRadius: windowWidth * 0.14,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});
