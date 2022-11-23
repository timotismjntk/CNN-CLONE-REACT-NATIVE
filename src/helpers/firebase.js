import storage from '@react-native-firebase/storage';

const uploadPicture = async filePicture => {
  const reference = storage().ref('notes' + new Date().getMilliseconds());
  const task = await reference.putFile(filePicture?.uri);
  if (task) {
    const url = await reference.getDownloadURL();
    if (url) {
      return url;
    }
  }
};

export {uploadPicture};
