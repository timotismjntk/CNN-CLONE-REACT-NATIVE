import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';

import {windowWidth, windowHeight} from '../utils';
import {color} from '../utils/theme';

const Tab = createBottomTabNavigator();

// import navigators
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import NotesNavigator from './NotesNavigator';
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
          height: windowHeight * 0.08,
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
              size={size}
              style={focused && styles.activeTabs}
              color={focused ? 'white' : bottomColor}
            />
          ),
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.03,
            fontFamily: 'DMSans-Regular',
          },
        }}
        name="HomeNavigator"
        component={HomeNavigator}
        lazy={true}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color: bottomColor}) => (
            <MaterialIcons
              name="search"
              size={size}
              style={focused && styles.activeTabs}
              color={focused ? 'white' : bottomColor}
            />
          ),
          headerTitle: 'Search',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'DMSans-Bold',
          },
          headerStyle: {
            backgroundColor: color,
          },
          headerLeft: null,
          tabBarLabel: 'Search',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.03,
            fontFamily: 'DMSans-Regular',
          },
        }}
        name="SearchNavigator"
        component={SearchNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color: bottomColor}) => (
            <MaterialIcons
              name={focused ? 'bookmark' : 'bookmark-border'}
              size={size}
              style={focused && styles.activeTabs}
              color={focused ? 'white' : bottomColor}
            />
          ),
          headerShown: false,
          tabBarLabel: 'Notes',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.03,
            fontFamily: 'DMSans-Regular',
          },
        }}
        name="NotesNavigator"
        component={NotesNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color: bottomColor}) => (
            <MaterialIcons
              name="settings"
              size={size}
              style={focused && styles.activeTabs}
              color={focused ? 'white' : bottomColor}
            />
          ),
          tabBarLabel: 'Settings',
          headerShown: false,
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: color,
          },
          headerLeft: null,
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.03,
            fontFamily: 'DMSans-Regular',
          },
        }}
        name="SettingsNavigator"
        component={SettingsNavigator}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activeTabs: {
    backgroundColor: color,
    padding: '3%',
    borderRadius: windowWidth * 0.02
  },
});