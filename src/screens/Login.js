import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import {windowWidth, windowHeight} from '../utils';
import {storeAuthenticatedUserToFireStore} from '../helpers/firebase';


// auth action
import {loginFacebook} from '../redux/reducer/auth';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {userDataFacebook} = useSelector(state => state.auth) || {};

  const onFacebookButtonPress = useCallback(async () => {
    try {
      dispatch(loginFacebook());
    } catch (e) {}
  }, [])

  useEffect(() => {
    if (userDataFacebook?.user && Object.keys(userDataFacebook.user).length > 0) {
      storeAuthenticatedUserToFireStore(userDataFacebook, 'facebook');
      Toast.show({
        type: 'success',
        text1: 'Succes',
        text2: 'Login Success',
      });
    }
  }, [userDataFacebook])


  const onGoogleButtonPress = useCallback(async () => {
    try {
      
    } catch (e) {}
  }, [])

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={require('../assets/timo-2-transparent.png')} />
        </View>
        <View style={styles.informationWrapper}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="person" size={windowWidth * 0.06} color="grey" />
            <TextInput value={username} onChangeText={setUserName} style={styles.input} placeholder="Username" placeholderTextColor="grey" />
          </View>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={windowWidth * 0.06} color="grey" />
            <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="Password" placeholderTextColor="grey" />
          </View>
          <RectButton style={styles.loginWrapper}>
            <Text style={styles.loginLabel}>Login</Text>
          </RectButton>
          <Text style={styles.socialAuthInfo}>Atau login menggunakan:</Text>
          <View style={styles.socialAuthButtonWrapper}>
            <RectButton rippleColor="red" onPress={onFacebookButtonPress} style={styles.socialAuthButton}>
              <View style={styles.socialAuthButtonImageWrapper}>
                <Image style={styles.image} source={require('../assets/facebook.png')} />
              </View>
            </RectButton>
            <RectButton rippleColor="red" onPress={onGoogleButtonPress} style={styles.socialAuthButton}>
              <View style={styles.socialAuthButtonImageWrapper}>
                <Image style={styles.image} source={require('../assets/google.png')} />
              </View>
            </RectButton>
          </View>
        </View>
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
    paddingHorizontal: '6%',
    alignItems: 'center',
  },
  imageWrapper: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  informationWrapper: {
    marginTop: '8%',
  },
  inputWrapper: {
    width: windowWidth * 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: '2%',
    borderRadius: windowWidth * 0.02,
    marginBottom: '3%',
  },
  input: {
    fontSize: windowWidth * 0.04,
    fontFamily: 'DMSans-Medium',
    color: 'white',
    flex: 1,
    paddingHorizontal: '4%',
  },
  loginWrapper: {
    marginBottom: '5%',
    marginTop: '3%',
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: windowWidth * 0.02,
  },
  loginLabel: {
    fontSize: windowWidth * 0.038,
    fontFamily: 'DMSans-Medium',
    color: 'black',
  },
  socialAuthInfo: {
    fontSize: windowWidth * 0.038,
    fontFamily: 'DMSans-Medium',
    color: 'white',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '6%',
  },
  socialAuthButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.07,
    borderRadius: windowHeight * 0.01,
    overflow: 'hidden',
    marginBottom: '3%',
  },
  socialAuthButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: windowWidth * 0.05,
    marginHorizontal: '5%',
    overflow: 'hidden',
  },
  socialAuthButtonImageWrapper: {
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
  },
});
