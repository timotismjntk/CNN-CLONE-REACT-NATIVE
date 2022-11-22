/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Modal as ReactModal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import {windowWidth} from '../../utils';

export default function AddYoutube({open, fn}) {
  const [videoYoutubeUrl, setVideoYoutubeUrl] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <ReactModal
      transparent={true}
      statusBarTranslucent
      hardwareAccelerated
      visible={open}
      onRequestClose={() => {
        fn({status: false, response: ''});
        setVideoYoutubeUrl('');
      }}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View
            style={[
              styles.inputWrapper,
              {borderColor: inputFocused ? '#0099e5' : 'black'},
            ]}>
            <View style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../assets/youtube.png')}
              />
            </View>
            <TextInput
              placeholder="Paste link/url video youtube"
              placeholderTextColor="grey"
              style={styles.input}
              value={videoYoutubeUrl}
              onChangeText={setVideoYoutubeUrl}
              autoFocus
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => {
                fn({status: false, response: ''});
                setVideoYoutubeUrl('');
              }}
              style={styles.buttonBatal}>
              <Text style={styles.buttonBatalLabel}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={videoYoutubeUrl?.trim()?.length === 0}
              onPress={() => {
                fn({status: false, response: videoYoutubeUrl});
                setVideoYoutubeUrl('');
              }}
              style={styles.simpanVideo}>
              <Text style={styles.simpanVideoLabel}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    height: '18%',
    borderRadius: windowWidth * 0.02,
    backgroundColor: 'white',
    elevation: 10,
    padding: '3%',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.12,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: windowWidth * 0.02,
    paddingHorizontal: '3%',
  },
  input: {
    flex: 1,
    color: 'black',
    fontFamily: 'DMSans-Bold',
    paddingLeft: '2%',
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
