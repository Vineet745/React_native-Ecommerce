
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Singleitemstyle from '../Stylesheets/Singleitemstyle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Star from './Star';

const Tab = createBottomTabNavigator();

const Singleproduct = ({ navigation }) => {
  const [singledata, setSingledata] = useState(null);
  const route = useRoute();
  const id = route.params.item.id;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const url = `https://fakestoreapi.com/products/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setSingledata(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleProduct();
  }, []);

  const cartdata = async () => {
    const userId = await AsyncStorage.getItem('USERID');

    firestore()
      .collection('users')
      .doc(userId)
      .collection('cart')
      .add({ Product: singledata })
      .then(() => {
        console.log('Product added to cart successfully');
        navigation.navigate('Your Cart');
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  if (!singledata) {
    return null; // Render a loading state or placeholder while fetching the data
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 500,
                borderBottomWidth: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{ height: '100%', width: '90%',objectFit:"contain" }}
                source={{ uri: singledata.image }}
              />
            </View>
            <View style={{ flex: 1, padding: 20 }}>
              <Text style={{ fontSize: 20, color: 'black' }}>
                {singledata.title}
              </Text>
              <Text style={{ fontSize: 15, marginTop: 10, color: 'black' }}>
                {singledata.description}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 10,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                ₹ {singledata.price}
              </Text>
              <Text style={{ fontSize: 24, color: 'black', marginTop: 5 }}>
                {singledata.category}
              </Text>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10,alignItems:"center" }}>
                <Text style={{ fontSize: 18, color: 'black' }}>
                Rating:- <Star starSize={10} rating={singledata.rating.rate}/> 
                </Text>
                <Text
                  style={{ marginLeft: 5, fontSize: 18, color: 'black' }}>
                  ({singledata.rating.count}){' '}
                  <Text style={{ color: 'blue' }}>rating reviews</Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={cartdata}
          style={Singleitemstyle.belowparent}>
          <Text style={Singleitemstyle.belowbuttontext}>Add to cart</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Buy')}
          style={Singleitemstyle.belowparent}>
          <Text style={Singleitemstyle.belowbuttontext}>Buy Now</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Singleproduct;

