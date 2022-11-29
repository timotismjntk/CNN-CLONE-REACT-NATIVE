import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth, windowHeight} from '../utils';

export default function Profil({navigation}) {
  const {notes: myNotes} = useSelector(state => state.notes) || {};
  const {savedArticles} = useSelector(state => state.savedArticles) || {};
  const {userDataFacebook} = useSelector(state => state.auth) || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.imageProfilWrapper}>
          <Image source={{uri: userDataFacebook?.user?.photoURL}} style={styles.imageProfil} />
        </View>
        <Text style={styles.namaUser}>{userDataFacebook?.user?.displayName || ''}</Text>
        <Text style={styles.lastSiginin}>
          {userDataFacebook?.user?.metadata.lastSignInTime ? 'Last Signin ' + new Intl.DateTimeFormat('id', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(userDataFacebook?.user?.metadata.lastSignInTime))
          : ''}
        </Text>
        <RectButton onPress={() => navigation.navigate('NotesNavigator')} style={styles.totalNotesWrapper}>
          <Text style={styles.totalNotes}>Total Notes Saved: {myNotes?.length || 0}</Text>
          <MaterialIcons name="chevron-right" size={windowWidth * 0.06} color="white" />
        </RectButton>
        <RectButton onPress={() => navigation.navigate('SettingsNavigator', {screen: 'SavedArticles'})} style={styles.totalSavedNewsArticlesWrapper}>
          <Text style={styles.totalSavedNewsArticles}>Total News Articles Saved: {savedArticles?.length || 0}</Text>
          <MaterialIcons name="chevron-right" size={windowWidth * 0.06} color="white" />
        </RectButton>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  wrapper: {
    paddingHorizontal: '4%',
    alignItems: 'center',
  },
  imageProfilWrapper: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: windowWidth * 0.2,
    overflow: 'hidden',
  },
  imageProfil: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  namaUser: {
    fontSize: windowWidth * 0.05,
    color: 'white',
    fontFamily: 'DMSans-Medium',
    marginTop: '5%',
  },
  lastSiginin: {
    fontSize: windowWidth * 0.034,
    color: 'white',
    fontFamily: 'DMSans-Regular',
    marginTop: '2%',
  },
  totalNotesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
  totalNotes: {
    fontSize: windowWidth * 0.034,
    color: 'white',
    fontFamily: 'DMSans-Regular',
  },
  totalSavedNewsArticlesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
  totalSavedNewsArticles: {
    fontSize: windowWidth * 0.034,
    color: 'white',
    fontFamily: 'DMSans-Regular',
  },
});
