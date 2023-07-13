import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from './Account';
import Categories from '../Categories';
import Cart from './Cart';

const Tab = createBottomTabNavigator();
const Bottomnavigation = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Category') {
            iconName = focused
              ? 'md-information-circle'
              : 'md-information-circle-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'ios-nutrition' : 'ios-nutrition-outline';
          } else if (route.name === 'Your Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          return <Ionicons name={iconName} size={25} color={'black'} />;
        },
        headerRight: () => (
          <TouchableOpacity onPress={()=>props.navigation.navigate('Your Cart')} style={{marginRight: 20}}>
            <Ionicons name="cart" size={25} color="black" />
          </TouchableOpacity>
        ),
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={Categories} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Your Cart" component={Cart} />
    </Tab.Navigator>
  );
};

export default Bottomnavigation;
