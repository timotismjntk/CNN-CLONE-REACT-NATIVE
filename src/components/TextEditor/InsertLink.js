import React, {useState} from 'react';
import {
  StyleSheet,
  Modal as ReactModal,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {windowWidth} from '../../utils';

export default function InsertLink({open, fn}) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  return (
    <ReactModal
      transparent={true}
      statusBarTranslucent
      hardwareAccelerated
      visible={open}
      onRequestClose={() => {
        fn({status: false, response: {}});
        setUrl('');
        setTitle('');
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          fn({status: false, response: {}});
          setUrl('');
          setTitle('');
        }}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Masukkan judul"
                placeholderTextColor="grey"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                autoFocus
              />
              <TextInput
                placeholder="Masukkan link"
                placeholderTextColor="grey"
                style={styles.input}
                value={url}
                onChangeText={setUrl}
                autoFocus
              />
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={() => {
                  fn({status: false, response: {}});
                  setUrl('');
                  setTitle('');
                }}
                style={styles.buttonBatal}>
                <Text style={styles.buttonBatalLabel}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  fn({status: false, response: {url, title}});
                  setUrl('');
                  setTitle('');
                }}
                style={styles.simpanVideo}>
                <Text style={styles.simpanVideoLabel}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: '5%',
  },
  modal: {
    width: '100%',
    minHeight: '25%',
    borderRadius: windowWidth * 0.02,
    backgroundColor: 'white',
    elevation: 10,
    padding: '3%',
    justifyContent: 'space-around',
  },
  inputWrapper: {},
  input: {
    color: 'black',
    fontFamily: 'DMSans-Bold',
    borderWidth: 1,
    borderRadius: windowWidth * 0.02,
    paddingHorizontal: '3%',
    marginBottom: '2%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBatal: {
    width: '48%',
    height: windowWidth * 0.1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.01,
  },
  buttonBatalLabel: {
    width: '48%',
    height: windowWidth * 0.1,
    color: 'white',
    fontSize: windowWidth * 0.034,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  simpanVideo: {
    width: '48%',
    height: windowWidth * 0.1,
    backgroundColor: '#0099e5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.01,
  },
  simpanVideoLabel: {
    width: '48%',
    height: windowWidth * 0.1,
    color: 'white',
    fontSize: windowWidth * 0.034,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
