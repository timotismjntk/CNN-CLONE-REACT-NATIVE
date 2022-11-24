import storage from '@react-native-firebase/storage';

const uploadPicture = async filePicture => {
  try {
    const reference = storage().ref('notes' + new Date().getTime());
    const task = await reference.putFile(filePicture?.uri);
    if (task) {
      const url = await reference.getDownloadURL();
      if (url) {
        return url;
      }
    }
  } catch (e) {}
};

export {uploadPicture};
