import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import User screens
import Settings from '../screens/Settings/Settings';

const Stack = createStackNavigator();
import {windowWidth, horizontalTransition} from '../utils';

export default function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{...horizontalTransition, headerShown: false}}
        name="Settings"
        component={Settings}
        lazy={true}
      />
    </Stack.Navigator>
  );
}
