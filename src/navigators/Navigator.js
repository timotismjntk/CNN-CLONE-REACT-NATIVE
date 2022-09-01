import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import {horizontalTransition} from '../utils';

// import navigators
import BottomTabNav from './BottomTabNav';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <StatusBar animated={true} translucent backgroundColor="red" />
      <Stack.Navigator>
        <Stack.Screen
          options={{...horizontalTransition, headerShown: false}}
          name="BottomTabNav"
          component={BottomTabNav}
          lazy={true}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
