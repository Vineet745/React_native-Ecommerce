import {View, Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Address from '../../Components/Address';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; 
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
const {width, height} = Dimensions.get('window');
const Account = props => {
  const [loginid, setLoginid] = useState('');
const [Adddetail, setAdddetail] = useState('');


  const isfocused = useIsFocused()
  useEffect(() => {
  const checkLogin = async () => {
    const id = await AsyncStorage.getItem('USERID');
    setLoginid(id);
  };
  checkLogin();
  }, [isfocused]);


  // Address Fetch
  useEffect(() => {
    const userdata = async()=>{
      try {
        const id = await AsyncStorage.getItem('USERID')
        const userdata = firestore().collection("users")
        const doc = await userdata.doc(id).get();

        if(doc.exists){
          const userdoc = doc.data();
          setAdddetail(userdoc)
        }
      } catch (error) {
        
      }
    }
    userdata();
  }, [isfocused])
  
  


  // Logout 

  const logout = async()=>{
     await AsyncStorage.removeItem('USERID')
      const currentUser = auth().currentUser;

      if(currentUser){

        auth().signOut().then(()=>{
          console.log('User Logged out Successfully')
          props.navigation.navigate('Home')

        }).catch((error)=>{
          console.log("Error occured during logout")
        })
      }else{
        console.log("No user currently Login")
      }
  }

  
  return (
    <View>
      {loginid ? (
        <TouchableOpacity onPress={() =>logout()}>
        <Text
          style={{
            borderWidth: 1,
            width: width - 15,
            borderColor: 'blue',
            alignSelf: 'center',
            padding: 15,
            color: 'white',
            textAlign: 'center',
            alignSelf: 'center',
            margin: 10,
            borderRadius: 10,
            backgroundColor: 'blue',
            fontSize:20
          }}>
          Logout
        </Text>
      </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
            <Text
              style={{
                width: width - 15,
                padding: 15,
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'blue',
                alignSelf: 'center',
                margin: 10,
                borderRadius: 10,
              }}>
              Signup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text
              style={{
                width: width - 15,
                padding: 15,
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'blue',
                alignSelf: 'center',
                margin: 10,
                borderRadius: 10,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}

     
{!loginid?<Text></Text>:<View style={{padding:10,borderWidth:1}}>
      <Text style={{fontSize:40,color:"black",alignSelf:"center",marginVertical:5,fontStyle:"italic"}}>Address Details</Text>
      <Text style={style.showbox}>Address: {Adddetail?.address}</Text>
      <Text style={style.showbox}>State: {Adddetail?.state}</Text>
      <Text style={style.showbox}>City : {Adddetail?.city}</Text>
      <Text style={style.showbox}>Pincode : {Adddetail?.pincode}</Text>
      <Text style={style.showbox}>Landmark : {Adddetail?.landmark}</Text>

     </View>}
     
      
    </View>
  );
};

const style = StyleSheet.create({
  showbox:{
    fontSize:20,
    margin:15,
    color:"black",
    fontStyle:"italic"
  }
})

export default Account;
