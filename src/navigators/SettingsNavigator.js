import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import User screens
import Settings from '../screens/Settings/Settings';
import SavedArticles from '../screens/Settings/SavedArticles';

const Stack = createStackNavigator();
import {windowWidth, horizontalTransition} from '../utils';
import {color} from '../utils/theme';

export default function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...horizontalTransition,
          headerTitle: 'Settings',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'DMSans-Bold',
          },
          headerStyle: {
            backgroundColor: color,
          },
          headerLeft: null,
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.034,
            marginBottom: '2%',
          },
        }}
        name="Settings"
        component={Settings}
        lazy={true}
      />
      <Stack.Screen
        options={{
          ...horizontalTransition,
          headerTitle: 'Saved Articles',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'DMSans-Bold',
          },
          headerStyle: {
            backgroundColor: color,
          },
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {
            fontSize: windowWidth * 0.034,
            marginBottom: '2%',
          },
        }}
        name="SavedArticles"
        component={SavedArticles}
        lazy={true}
      />
    </Stack.Navigator>
  );
}
