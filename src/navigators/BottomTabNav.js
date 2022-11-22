import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';
import Animated, {BounceIn} from 'react-native-reanimated';

import {windowWidth, windowHeight} from '../utils';
import {color} from '../utils/theme';

const Tab = createBottomTabNavigator();

// import navigators
import UserNavigator from './UserNavigator';
import SearchNavigator from './SearchNavigator';
import NotesNavigator from './NotesNavigator';
import SettingsNavigator from './SettingsNavigator';

export default function RootNavigator() {
  const MaterialIconsAnimated = Animated.createAnimatedComponent(MaterialIcons);

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
            <MaterialIconsAnimated
              entering={focused && BounceIn}
              name="home"
              size={
                focused ? size + windowWidth * 0.015 : size + windowWidth * 0.01
              }
              color={bottomColor}
            />
          ),
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.03,
            fontFamily: 'DMSans-Regular',
          },
        }}
        name="UserNavigator"
        component={UserNavigator}
        lazy={true}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, size, color: bottomColor}) => (
            <MaterialIconsAnimated
              entering={focused && BounceIn}
              name="search"
              size={
                focused ? size + windowWidth * 0.015 : size + windowWidth * 0.01
              }
              color={bottomColor}
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
            <MaterialIconsAnimated
              entering={focused && BounceIn}
              name={focused ? 'bookmark' : 'bookmark-border'}
              size={
                focused ? size + windowWidth * 0.015 : size + windowWidth * 0.01
              }
              color={bottomColor}
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
            <MaterialIconsAnimated
              entering={focused && BounceIn}
              name="person"
              size={
                focused ? size + windowWidth * 0.015 : size + windowWidth * 0.01
              }
              color={bottomColor}
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
