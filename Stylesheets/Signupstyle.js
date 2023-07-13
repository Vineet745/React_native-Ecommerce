import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
export default Signupstyle = StyleSheet.create({
  inputbox: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 30,
    fontSize: 20,
    color: 'black',
    padding: 15,
  },
  btnstyle: {
    width: width - 15,
    padding: 15,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#0062b6',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 10,
    marginTop:30,
    fontSize:20,
    letterSpacing:1
  },
});
