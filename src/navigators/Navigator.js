import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();
import {horizontalTransition, verticalTransition} from '../utils';
import {color} from '../utils/theme';

// import Bottomtabs navigator
import BottomTabNav from './BottomTabNav';

// import Notes screens
import AddNotes from '../screens/Notes/AddNotes';
import EditNotes from '../screens/Notes/EditNotes';

export default function RootNavigator() {
  return (
    <NavigationContainer
      onReady={async () => await RNBootSplash.hide({fade: true})}>
      <StatusBar animated={true} translucent backgroundColor={color} />
      <Stack.Navigator>
        <Stack.Screen
          options={{...horizontalTransition, headerShown: false}}
          name="BottomTabNav"
          component={BottomTabNav}
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
    </NavigationContainer>
  );
}
