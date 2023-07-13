import { View, Text,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState} from 'react'
import Signupstyle from '../Stylesheets/Signupstyle'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from "react-native-uuid"
const Signup = (props) => {
  
  
  const [name, setName] = useState('')
  const [number,setNumber] =useState('')
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const createuser = async ()=>{
    const userId = uuid.v4();

    try {
       const user =auth().createUserWithEmailAndPassword(email,password).then(res=>{
        firestore().collection('users').doc(userId).set({
          name:name,
          username:username,
          email:email,
          userId : userId
        }).then(res =>{
          props.navigation.navigate('Home')
        }).catch(error=>{
          console.log(error)
        })
          
       }).catch(err=>{
         console.log('error',err)
       })
      
     
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <ScrollView>
    <View style={{margin:10}}>
      <Text style={{fontSize:40,textAlign:"center",fontStyle:"italic",margin:20,color:"black"}}>Signup User</Text>
      <TextInput value={name} onChangeText={value=>setName(value)} style={Signupstyle.inputbox} placeholder="Enter your Name"></TextInput>
      <TextInput value={username} onChangeText={value=>setUsername(value)} style={Signupstyle.inputbox} placeholder="Enter your Username"></TextInput>
      <TextInput value={number} onChangeText={value=>setNumber(value)} style={Signupstyle.inputbox} placeholder="Enter your Number"></TextInput>
      <TextInput value={email} onChangeText={value=>setEmail(value)} style={Signupstyle.inputbox} placeholder="Enter your Email"></TextInput>
      <TextInput value={password} onChangeText={value=>setPassword(value)} style={Signupstyle.inputbox} placeholder="Enter your Password"></TextInput>
      <TouchableOpacity onPress={()=>createuser()}>
        <Text style={Signupstyle.btnstyle}>Signup</Text>
      </TouchableOpacity>
     <View style={{textAlign:"center",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:20}} >
      <Text style={{fontSize:20}}>Already a User?  </Text>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
       <Text style={{fontSize:20,color:"#0062b6"}}>Please Login</Text>
      </TouchableOpacity>
     </View>

    </View>
    </ScrollView>
  )
}

export default Signup