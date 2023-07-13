import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginuser = async()=>{

   try {
    const user =auth().signInWithEmailAndPassword(email,password).then(res=>{
      firestore().collection('users').where('email','==', email).get().then(res=>{
        if(res.docs !== []){
          console.log(JSON.stringify(res.docs[0].data()));
          adddatainAsync(res.docs[0].data().name,
          res.docs[0].data().email,
          res.docs[0].data().userId,)
        }else{
          console.warn("User not found")
        }
      })
     }).catch(error=>{
      console.log(error)
     })
   } catch (error) {
    console.log(error)
   }

   
  }

const adddatainAsync = async(name,email,userId)=>{
  await AsyncStorage.setItem("Name",name);
  await AsyncStorage.setItem("EMAIL",email);
  await AsyncStorage.setItem("USERID",userId);
  props.navigation.navigate("Home")
}


  return (
    <View style={{margin: 10}}>
      <Text
        style={{
          fontSize: 40,
          textAlign: 'center',
          fontStyle: 'italic',
          margin: 20,
          color: 'black',
        }}>
        Login User
      </Text>
      <TextInput
        value={email}
        onChangeText={value => setEmail(value)}
        style={Signupstyle.inputbox}
        placeholder="Enter your Email"></TextInput>
      <TextInput
        value={password}
        onChangeText={value => setPassword(value)}
        style={Signupstyle.inputbox}
        placeholder="Enter your Password"></TextInput>
      <TouchableOpacity onPress={()=>loginuser()}>
        <Text style={Signupstyle.btnstyle}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          textAlign: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20}}>Not a User? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
          <Text style={{fontSize: 20, color: '#0062b6'}}>Please Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
