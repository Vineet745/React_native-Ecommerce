import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Bottomnavigation from './Navigation/Bottomnavigation/Bottomnavigation'
import Singleproduct from './Components/Singleproduct'
import Buynow from './Components/Buynow'
import Renderitem from './Components/Renderitem'
import Cart from './Navigation/Bottomnavigation/Cart'
import Ionicons from "react-native-vector-icons/Ionicons"
import Address from './Components/Address'
const Stack = createNativeStackNavigator()
 
const App = (props) => {
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer  >
      <Stack.Navigator  >
        <Stack.Screen name='Bottom' component={Bottomnavigation} options={{headerShown:false}}/>
        <Stack.Screen name='Singleproduct' component={Singleproduct} 
        options={{headerShown:true}}/>
        <Stack.Screen name='Buy' component={Buynow} options={{headerShown:true,
          }}/>
        <Stack.Screen name="Renderitem" component={Renderitem} options={{headerShown:true}}/>
        <Stack.Screen name='Signup'  component={Signup} options={{headerShown:true}} />
        <Stack.Screen name='Login' component={Login} options={{headerShown:true}}/>
        <Stack.Screen name='Address' component={Address} options={{headerShown:true}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )
}

export default App