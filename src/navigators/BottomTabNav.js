/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth, windowHeight} from '../utils';
import {color} from '../utils/theme';

const Tab = createBottomTabNavigator();

// import navigators
import UserNavigator from './UserNavigator';
import SearchNavigator from './SearchNavigator';
import SettingsNavigator from './SettingsNavigator';

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: color,
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarHideOnKeyboard: true,
        lazy: true,
        tabBarStyle: {
          height: windowHeight * 0.085,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color: bottomColor}) => (
            <MaterialIcons
              name="home"
              size={
                focused ? size + windowWidth * 0.02 : size + windowWidth * 0.01
              }
              color={bottomColor}
            />
          ),
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.034,
            marginBottom: '2%',
          },
        }}
        name="UserNavigator"
        component={UserNavigator}
        lazy={true}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color: bottomColor}) => (
            <MaterialIcons
              name="search"
              size={
                focused ? size + windowWidth * 0.02 : size + windowWidth * 0.01
              }
              color={bottomColor}
            />
          ),
          headerTitle: 'Search',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: color,
          },
          headerLeft: null,
          tabBarLabel: 'Search',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.034,
            marginBottom: '2%',
          },
        }}
        name="SearchNavigator"
        component={SearchNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color: bottomColor}) => (
            <MaterialIcons
              name="person"
              size={
                focused ? size + windowWidth * 0.02 : size + windowWidth * 0.01
              }
              color={bottomColor}
            />
          ),
          tabBarLabel: 'Settings',
          headerShown: false,
          headerTitle: 'Search',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: color,
          },
          headerLeft: null,
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.034,
            marginBottom: '2%',
          },
        }}
        name="SettingsNavigator"
        component={SettingsNavigator}
      />
    </Tab.Navigator>
  );
}
