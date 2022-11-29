/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// import User screens
import Home from '../screens/Home';
import Search from '../screens/Search/Search';

const Stack = createStackNavigator();
import {windowWidth, horizontalTransition} from '../utils';
import {color} from '../utils/theme';

export default function HomeNavigator() {
  // call accesscode stored in mmkv storage
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
            backgroundColor: '#e30000',
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
            backgroundColor: '#e30000',
          },
          headerLeft: null,
        }}
        name="Search"
        component={Search}
        lazy={true}
      />
    </Stack.Navigator>
  );
}
