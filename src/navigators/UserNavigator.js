/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {RectButton} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

// import User screens
import Login from '../screens/Login';
import Profil from '../screens/Profil';

const Stack = createStackNavigator();
import {color} from '../utils/theme';
import {windowWidth} from '../utils';
import { logoutFacebook } from '../redux/reducer/auth';

export default function UserNavigator() {
  const dispatch = useDispatch();
  const {userDataFacebook} = useSelector(state => state.auth) || {};

  const isLogin = userDataFacebook?.user ? Object.keys(userDataFacebook.user).length > 0 : false;

  return (
    <Stack.Navigator>
      {isLogin ? (
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTintColor: 'white',
            gestureEnabled: true,
            headerTitleStyle: {
              fontFamily: 'DMSans-Medium',
            },
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              elevation: 0,
            },
            headerRight: ({tintColor}) => (
              <RectButton onPress={() => dispatch(logoutFacebook())} rippleColor="white" style={{padding: '3%', borderRadius: windowWidth * 0.02, marginRight: '10%'}}>
                <Text style={{color: tintColor,  fontSize: windowWidth * 0.034, fontFamily: 'DMSans-Medium'}}>Logout</Text>
              </RectButton>
            ),
          }}
          name="Profil"
          component={Profil}
          lazy={true}
        />
      ) : (
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTintColor: 'white',
            gestureEnabled: true,
            headerTitleStyle: {
              fontFamily: 'DMSans-Medium',
            },
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              elevation: 0,
            },
          }}
          name="Login"
          component={Login}
          lazy={true}
        />
      )}
      
      
    </Stack.Navigator>
  );
}
