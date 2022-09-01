/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

// import User screens
import Home from '../screens/Home';
import Search from '../screens/Search/Search';
import Login from '../screens/Login';

const Stack = createStackNavigator();
import {windowWidth, horizontalTransition} from '../utils';

export default function UserNavigator() {
  // call accesscode stored in mmkv storage
  const {pengguna, isLoginUserModalSuccessOpen} = useSelector(
    state => state.auth,
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...horizontalTransition,
          headerTitle: () => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              <Image
                style={{
                  height: windowWidth * 0.08,
                  width: windowWidth * 0.25,
                  resizeMode: 'stretch',
                }}
                source={require('../assets/timo.png')}
              />
            </View>
          ),
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerLeft: null,
        }}
        name="Home"
        component={Home}
        lazy={true}
      />
      <Stack.Screen
        options={{
          ...horizontalTransition,
          headerTitle: 'Search',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerLeft: null,
        }}
        name="Search"
        component={Search}
        lazy={true}
      />
      <Stack.Screen
        options={{...horizontalTransition, headerShown: false}}
        name="Login"
        component={Login}
        lazy={true}
      />
    </Stack.Navigator>
  );
}
