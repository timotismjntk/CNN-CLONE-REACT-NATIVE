import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Modal as ReactModal,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {windowWidth} from '../../utils';

export default function AddImage({open, fn}) {
  const cameraOptions = useRef({
    mediaType: 'photo',
    cameraType: 'front',
    presentationStyle: 'popover',
    quality: 0.3,
    includeBase64: true,
  }).current;

  const libraryOptions = useRef({
    mediaType: 'photo',
    presentationStyle: 'popover',
    quality: 0.3,
    includeBase64: true,
  }).current;

  const addFotoByCamera = React.useCallback(async () => {
    try {
      const data = await launchCamera(cameraOptions);
      if (data?.assets?.length > 0) {
        if (data?.assets[0]?.base64?.length > 0) {
          fn({
            status: false,
            response: 'data:image/png;base64,' + data?.assets[0]?.base64,
          });
        }
      }
    } catch (e) {}
  }, [cameraOptions, fn]);

  const addFotoByGalery = React.useCallback(async () => {
    try {
      const data = await launchImageLibrary(libraryOptions);
      if (data?.assets?.length > 0) {
        if (data?.assets[0]?.base64?.length > 0) {
          fn({
            status: false,
            response: 'data:image/png;base64,' + data?.assets[0]?.base64,
          });
        }
      }
    } catch (e) {}
  }, [libraryOptions, fn]);

  return (
    <ReactModal
      transparent={true}
      statusBarTranslucent
      hardwareAccelerated
      visible={open}
      onRequestClose={() => fn({status: false, response: ''})}>
      <TouchableWithoutFeedback
        onPress={() => fn({status: false, response: ''})}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={addFotoByCamera} style={styles.menu}>
              <MaterialIcons
                name="photo-camera"
                color="rgba(0,0,0,0.8)"
                size={windowWidth * 0.06}
              />
              <Text style={styles.menuLabel}>Buka Kamera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addFotoByGalery} style={styles.menu}>
              <MaterialIcons
                name="add-photo-alternate"
                color="rgba(0,0,0,0.8)"
                size={windowWidth * 0.06}
              />
              <Text style={styles.menuLabel}>Plih Gambar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 10,
  },
  menu: {
    padding: '4%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    color: 'black',
    fontFamily: 'DMSans-Bold',
    marginLeft: '3%',
  },
});
