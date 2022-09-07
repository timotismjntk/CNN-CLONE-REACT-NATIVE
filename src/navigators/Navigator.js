import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import {horizontalTransition} from '../utils';
import {color} from '../utils/theme';

// import navigators
import BottomTabNav from './BottomTabNav';

export default function RootNavigator({hideBootSplash}) {
  return (
    <NavigationContainer onReady={() => hideBootSplash()}>
      <StatusBar animated={true} translucent backgroundColor={color} />
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
