import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const uploadPicture = async (filePicture, fileName) => {
  try {
    const reference = storage().ref(fileName + new Date().getTime());
    const task = await reference.putFile(filePicture?.uri);
    if (task) {
      const url = await reference.getDownloadURL();
      if (url) {
        return url;
      }
    }
  } catch (e) {}
};

const storeAuthenticatedUserToFireStore = async (user, typeLogin) => {
  try {
    if (typeLogin === 'facebook') {
      const userId = user?.additionalUserInfo?.profile?.firtsName + user?.additionalUserInfo?.profile?.lastsName +  '-' + user?.additionalUserInfo?.profile?.id
      await firestore().collection('users').doc(userId).set(user);
    }
  } catch (e) {}
};

export {uploadPicture, storeAuthenticatedUserToFireStore};
