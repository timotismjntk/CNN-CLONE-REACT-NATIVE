/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth, windowHeight} from '../../utils';
import {color} from '../../utils/theme';

// import action redux;
import {editNotes} from '../../redux/reducer/notes';

export default function EditNotes({route: {params}, navigation}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(params?.title || '');
  const [content, setContent] = useState(params?.content || '');
  const [isSaved, setIsSaved] = useState(false);
  const [editedAt, setEditedAt] = useState(params?.editedAt || '');

  const editNotesFn = useCallback(() => {
    dispatch(
      editNotes({
        ...params,
        title,
        content,
        editedAt: new Intl.DateTimeFormat('id', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date()),
      }),
    );
    setEditedAt(
      new Intl.DateTimeFormat('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date()),
    );
    setIsSaved(false);
  }, [title, content]);

  const isFilled = useCallback(() => {
    return content?.trim()?.length > 0 && title?.trim()?.length > 0;
  }, [content, title]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View style={styles.headerContainer}>
        <RectButton onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="chevron-left"
            size={windowWidth * 0.08}
            color="white"
          />
        </RectButton>
        <View style={styles.headerRight}>
          {/* <RectButton>
            <MaterialIcons
              name="undo"
              size={windowWidth * 0.07}
              color="white"
            />
          </RectButton>
          <RectButton style={styles.headerRightIcon}>
            <MaterialIcons
              name="redo"
              size={windowWidth * 0.07}
              color="white"
            />
          </RectButton> */}
          <RectButton
            onPress={editNotesFn}
            enabled={isFilled() && isSaved}
            style={styles.headerRightIcon}>
            <MaterialIcons
              name="check"
              size={windowWidth * 0.06}
              color={
                isFilled() && isSaved ? 'white' : 'rgba(255, 255, 255, 0.6)'
              }
            />
          </RectButton>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          selectionColor={color}
          selectTextOnFocus={true}
          placeholder="Title"
          placeholderTextColor="grey"
          style={styles.title}
          value={title}
          onChangeText={text => {
            setTitle(text);
            setIsSaved(true);
          }}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.date}>{editedAt || ''}</Text>
          <View style={styles.separator} />
          <Text style={styles.totalCharacter}>{content?.length} character</Text>
        </View>
        <TextInput
          value={content}
          onChangeText={text => {
            setContent(text);
            setIsSaved(true);
          }}
          selectionColor={color}
          selectTextOnFocus={true}
          style={styles.content}
          multiline
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingTop: '5%',
  },
  headerContainer: {
    backgroundColor: color,
    marginTop: '8%',
    paddingVertical: '4%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerRightIcon: {
    marginLeft: windowWidth * 0.04,
  },
  title: {
    color: 'black',
    fontSize: windowWidth * 0.07,
    fontWeight: 'bold',
    paddingHorizontal: '4%',
  },
  infoWrapper: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
  },
  separator: {
    width: windowWidth * 0.0042,
    backgroundColor: '#E5E5E5',
    marginRight: '1.5%',
  },
  date: {
    color: 'grey',
    fontSize: windowWidth * 0.032,
    flex: 0.75,
  },
  totalCharacter: {
    color: 'grey',
    fontSize: windowWidth * 0.032,
    flex: 1,
  },
  content: {
    color: 'black',
    fontSize: windowWidth * 0.038,
    minHeight: windowHeight * 0.7,
    textAlignVertical: 'top',
    marginTop: '2%',
    paddingHorizontal: '4%',
  },
});
