/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

// import User screens
import Search from '../screens/Search/Search';
import SearchResults from '../screens/Search/SearchResults';

const Stack = createStackNavigator();
import {windowWidth, horizontalTransition} from '../utils';

export default function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{...horizontalTransition, headerShown: false}}
        name="Search"
        component={Search}
        lazy={true}
      />
      <Stack.Screen
        options={{headerShown: false, animationEnabled: false}}
        name="SearchResults"
        component={SearchResults}
        lazy={true}
      />
    </Stack.Navigator>
  );
}
