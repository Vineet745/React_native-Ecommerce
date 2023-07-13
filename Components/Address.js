import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Address = (props) => {
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');

  const EnterAddress = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    firestore().collection('users').doc(userId).update({
      address: address,
      state: state,
      city: city,
      pincode: pincode,
      landmark: landmark,
    }).then(res=>{
      console.log(res)
      props.navigation.navigate('Home')
    }).catch(err=>console.log(err))
  };

  

  return (
    <ScrollView>
    <View>
      <Text
        style={{
          fontSize: 40,
          textAlign: 'center',
          fontStyle: 'italic',
          margin: 20,
          color: 'black',
        }}
        placeholder="Enter your Address">
        Enter Your Address
      </Text>
      <TextInput
        value={address}
        onChangeText={value => setAddress(value)}
        style={Signupstyle.inputbox}
        placeholder="Enter your Address"></TextInput>
      <TextInput
        value={state}
        onChangeText={value => setState(value)}
        style={Signupstyle.inputbox}
        placeholder="Enter your State"></TextInput>
      <TextInput
        value={city}
        onChangeText={value => setCity(value)}
        style={Signupstyle.inputbox}
        placeholder="Enter your City"></TextInput>
      <TextInput
        value={pincode}
        onChangeText={value => setPincode(value)}
        style={Signupstyle.inputbox}
        placeholder="Enter your Pincode"></TextInput>
      <TextInput
        value={landmark}
        onChangeText={value => setLandmark(value)}
        style={Signupstyle.inputbox}
        placeholder="Enter your Landmark"></TextInput>
      <TouchableOpacity onPress={()=>EnterAddress()}>
        <Text style={Signupstyle.btnstyle}>Add Address</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default Address;
