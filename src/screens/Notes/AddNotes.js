/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef} from 'react';
import {useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Appearance,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

// import components
import {TextEditor, Toolbar} from '../../components/TextEditor';

import {windowWidth, windowHeight} from '../../utils';
import {color} from '../../utils/theme';

// import action redux;
import {addNotes} from '../../redux/reducer/notes';

const theme = Appearance.getColorScheme();

export default function AddNotes({navigation}) {
  const dispatch = useDispatch();
  const richText = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const addToNotes = useCallback(() => {
    dispatch(
      addNotes({
        title,
        content,
        savedAt: new Intl.DateTimeFormat('id', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date()),
        editedAt: new Intl.DateTimeFormat('id', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date()),
      }),
    );
    setIsSaved(false);
    Toast.show({
      type: 'success',
      text1: 'Sukses',
      text2: 'Berhasil membuat catatan baru!',
    });
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
          <RectButton
            onPress={addToNotes}
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
      <Toolbar richTextRef={richText} />
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
          <Text style={styles.date}>
            {new Intl.DateTimeFormat('id', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date())}
          </Text>
        </View>
        <TextEditor
          initialContentHTML={content}
          richTextRef={richText}
          onChange={{setContent, setIsSaved}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'light' ? 'white' : '#2e3847',
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
    color: theme === 'light' ? 'black' : 'white',
    fontSize: windowWidth * 0.07,
    fontFamily: 'DMSans-Bold',
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
