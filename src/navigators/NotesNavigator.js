import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import Notes screens
import Notes from '../screens/Notes/Notes';

const Stack = createStackNavigator();
import {horizontalTransition} from '../utils';
import {color} from '../utils/theme';

export default function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...horizontalTransition,
          headerTitle: 'Notes',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'DMSans-Bold',
          },
          headerStyle: {
            backgroundColor: color,
          },
          headerLeft: null,
        }}
        name="Notes"
        component={Notes}
        lazy={true}
      />
    </Stack.Navigator>
  );
}
