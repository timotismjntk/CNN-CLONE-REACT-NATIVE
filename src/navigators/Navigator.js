import React from 'react';
import {StatusBar} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
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

// import user navigator
import UserNavigator from './UserNavigator';

export default function RootNavigator() {
  // There's a solution in react-navigation v6.x
  // Setting cardStyle: {backgroundColor: 'transparent'} on screenOptions prop for the Stack Navigator didn't work for me.
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <NavigationContainer
      theme={navTheme} // setting this to make header transparent
      onReady={async () => await RNBootSplash.hide({fade: true})}>
      <StatusBar animated={true} translucent backgroundColor="transparent" />
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
            gestureEnabled: true,
            cardOverlayEnabled: true,
          }}
          name="AddNotes"
          component={AddNotes}
          lazy={true}
        />
        <Stack.Screen
          options={{
            ...verticalTransition,
            headerShown: false,
            gestureEnabled: true,
          }}
          name="EditNotes"
          component={EditNotes}
          lazy={true}
        />
        <Stack.Screen
          options={{
            ...verticalTransition,
            headerShown: false,
            gestureEnabled: true,
          }}
          name="UserNavigator"
          component={UserNavigator}
          lazy={true}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
