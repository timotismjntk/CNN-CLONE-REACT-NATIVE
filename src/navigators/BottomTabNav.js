/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth, windowHeight} from '../utils';

const Tab = createBottomTabNavigator();

// import navigators
import UserNavigator from './UserNavigator';
import SearchNavigator from './SearchNavigator';
import SettingsNavigator from './SettingsNavigator';

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarHideOnKeyboard: true,
        lazy: true,
        tabBarStyle: {
          height: windowHeight * 0.08,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialIcons
              name="home"
              size={size + windowWidth * 0.01}
              color={color}
            />
          ),
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.03,
            marginBottom: '2%',
          },
        }}
        name="UserNavigator"
        component={UserNavigator}
        lazy={true}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialIcons
              name="search"
              size={size + windowWidth * 0.01}
              color={color}
            />
          ),
          headerTitle: 'Search',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerLeft: null,
          tabBarLabel: 'Search',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.03,
            marginBottom: '2%',
          },
        }}
        name="SearchNavigator"
        component={SearchNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <MaterialIcons
              name="person"
              size={size + windowWidth * 0.01}
              color={color}
            />
          ),
          headerTitle: 'Settings',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerLeft: null,
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.03,
            marginBottom: '2%',
          },
        }}
        name="SettingsNavigator"
        component={SettingsNavigator}
      />
    </Tab.Navigator>
  );
}
