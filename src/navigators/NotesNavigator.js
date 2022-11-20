import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import User screens
import Notes from '../screens/Notes/Notes';
import AddNotes from '../screens/Notes/AddNotes';
import EditNotes from '../screens/Notes/EditNotes';

const Stack = createStackNavigator();
import {verticalTransition, horizontalTransition} from '../utils';
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
          headerStyle: {
            backgroundColor: color,
          },
          headerLeft: null,
        }}
        name="Notes"
        component={Notes}
        lazy={true}
      />
      <Stack.Screen
        options={{
          ...verticalTransition,
          headerShown: false,
        }}
        name="AddNotes"
        component={AddNotes}
        lazy={true}
      />
      <Stack.Screen
        options={{
          ...verticalTransition,
          headerShown: false,
        }}
        name="EditNotes"
        component={EditNotes}
        lazy={true}
      />
    </Stack.Navigator>
  );
}
