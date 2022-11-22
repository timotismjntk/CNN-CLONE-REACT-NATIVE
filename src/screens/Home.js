import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// import screen tab
import TopNews from './News/TopNews';
import General from './News/General';
import Technology from './News/Technology';
import Sports from './News/Sports';
import Science from './News/Science';
import Entertainment from './News/Entertainment';
import Business from './News/Business';

import {windowWidth} from '../utils';
import {color} from '../utils/theme';

const TopTab = createMaterialTopTabNavigator();

export default function Home({navigation}) {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarPressColor: 'transparent',
        tabBarIndicatorStyle: {backgroundColor: color},
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          fontSize: windowWidth * 0.032,
          textTransform: 'capitalize',
          fontFamily: 'DMSans-Bold',
        },
        tabBarItemStyle: {width: 'auto'},
      }}>
      <TopTab.Screen
        name="TopNews"
        options={{
          title: 'Top News',
          lazy: true,
        }}
        component={TopNews}
      />
      <TopTab.Screen
        name="General"
        options={{
          title: 'General',
          lazy: true,
        }}
        component={General}
      />
      <TopTab.Screen
        name="Sports"
        options={{
          title: 'Sports',
          lazy: true,
        }}
        component={Sports}
      />
      <TopTab.Screen
        name="Technology"
        options={{
          title: 'Technology',
          lazy: true,
        }}
        component={Technology}
      />
      <TopTab.Screen
        name="Science"
        options={{
          title: 'Science',
          lazy: true,
        }}
        component={Science}
      />
      <TopTab.Screen
        name="Entertainment"
        options={{
          title: 'Entertainment',
          lazy: true,
        }}
        component={Entertainment}
      />
      <TopTab.Screen
        name="Business"
        options={{
          title: 'Business',
          lazy: true,
        }}
        component={Business}
      />
    </TopTab.Navigator>
  );
}
