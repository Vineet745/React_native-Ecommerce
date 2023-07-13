import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Star from './Star';
const {width, height} = Dimensions.get('window');
import RazorpayCheckout from 'react-native-razorpay';

const Buynow = ({cartdata}) => {
  const route = useRoute();
  const [firstdata, setFirstdata] = useState('');
  const id = route.params.cartdata;
  console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `https://fakestoreapi.com/products/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setFirstdata(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              height: 500,
              borderBottomWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{height: '100%', width: '90%', objectFit: 'contain'}}
              source={{uri: firstdata.image}}
            />
          </View>
          <View style={{flex: 1, padding: 20}}>
            <Text style={{fontSize: 20, color: 'black'}}>
              {firstdata.title}
            </Text>
            <Text style={{fontSize: 15, marginTop: 10, color: 'black'}}>
              {firstdata.description}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                fontWeight: 'bold',
                color: 'black',
              }}>
              ₹ {firstdata.price}
            </Text>
            <Text style={{fontSize: 24, color: 'black', marginTop: 5}}>
              {firstdata.category}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, color: 'black'}}>
                Rating:- <Star starSize={10} rating={firstdata.rating?.rate} />
              </Text>
              <Text style={{marginLeft: 5, fontSize: 18, color: 'black'}}>
                ({firstdata.rating?.count}){' '}
                <Text style={{color: 'blue'}}>rating reviews</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: width,
          borderTopWidth: 1,
          height: 70,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            var options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.jpg',
              currency: 'INR',
              key: 'rzp_test_UMGXxC8J058mtm',
              amount: firstdata.price * 100,
              name: 'Acme Corp',
              order_id: '', //Replace this with an order_id created using Orders API.
              prefill: {
                email: 'vineetagrawal745@gmail.com',
                contact: '7974043856',
                name: 'Vineet Agrawal',
              },
              theme: {color: '#53a20e'},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
          style={{
            backgroundColor: 'green',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            borderRadius: 10,
            borderWidth: 1,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>
            Place Order ₹ {firstdata.price}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Buynow;
