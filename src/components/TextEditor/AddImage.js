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
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {windowWidth} from '../../utils';
import {uploadPicture} from '../../helpers/firebase';

export default function AddImage({open, fn}) {
  const cameraOptions = useRef({
    mediaType: 'photo',
    cameraType: 'back',
    presentationStyle: 'popover',
    quality: 0.5,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    includeBase64: true,
  }).current;

  const libraryOptions = useRef({
    mediaType: 'photo',
    presentationStyle: 'popover',
    quality: 0.5,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    includeBase64: true,
  }).current;

  const addFotoByCamera = React.useCallback(async () => {
    try {
      fn(prev => ({...prev, isLoading: true}));
      const data = await launchCamera(cameraOptions);
      if (data?.didCancel) {
        fn(prev => ({...prev, isLoading: false}));
      } else {
        if (data?.assets?.length > 0) {
          if (data?.assets[0]?.uri?.length > 0) {
            const reduceImageQuality = await ImageResizer.createResizedImage(
              data?.assets[0]?.uri, // path
              400, // width
              400, // height
              'JPEG', // compressFormat
              60, // quality
              0, // rotation
              undefined, // outputPath
              false,
              {mode: 'stretch', onlyScaleDown: true},
            );
            if (reduceImageQuality) {
              const response = await uploadPicture(reduceImageQuality);
              if (response) {
                fn({
                  status: false,
                  response: response,
                  isLoading: false,
                });
              } else {
                fn({
                  status: false,
                  response: data?.assets[0]?.base64,
                  isLoading: false,
                });
              }
            }
          }
        }
      }
    } catch (e) {}
  }, [cameraOptions, fn]);

  const addFotoByGalery = React.useCallback(async () => {
    try {
      fn(prev => ({...prev, isLoading: true}));
      const data = await launchImageLibrary(libraryOptions);
      if (data?.didCancel) {
        fn(prev => ({...prev, isLoading: false}));
      } else {
        if (data?.assets?.length > 0) {
          if (data?.assets[0]?.uri?.length > 0) {
            const reduceImageQuality = await ImageResizer.createResizedImage(
              data?.assets[0]?.uri, // path
              400, // width
              400, // height
              'JPEG', // compressFormat
              60, // quality
              0, // rotation
              undefined, // outputPath
              false,
              {mode: 'stretch', onlyScaleDown: true},
            );
            if (reduceImageQuality) {
              const response = await uploadPicture(reduceImageQuality);
              if (response) {
                fn({
                  status: false,
                  response: response,
                  isLoading: false,
                });
              } else {
                fn({
                  status: false,
                  response: data?.assets[0]?.base64,
                  isLoading: false,
                });
              }
            }
          }
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
      onRequestClose={() =>
        fn(prev => ({...prev, status: false, response: ''}))
      }>
      <TouchableWithoutFeedback
        onPress={() => fn(prev => ({...prev, status: false, response: ''}))}>
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
              <Text style={styles.menuLabel}>Pilih Gambar</Text>
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
