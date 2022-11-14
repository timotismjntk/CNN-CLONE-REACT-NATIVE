import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';

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
          height: windowHeight * 0.1,
        },
        tabBarItemStyle: {
          paddingVertical: '2%',
        },
        tabBarButton: props => <RectButton rippleColor={color} {...props} />,
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
          },
        }}
        name="SettingsNavigator"
        component={SettingsNavigator}
      />
    </Tab.Navigator>
  );
}
