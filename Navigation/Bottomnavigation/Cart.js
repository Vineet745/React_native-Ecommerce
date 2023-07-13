// export default Cart
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Singleproduct from '../../Components/Singleproduct';
import RazorpayCheckout from 'react-native-razorpay';

const {width, height} = Dimensions.get('window');

const Cart = props => {
  const [cartdata, setCartdata] = useState([]);
  const [address,setAddress] = useState();
  const [loginid,setLoginid] = useState();
  const [length, setLength] = useState('')
  const isfocused = useIsFocused();



  
  

// Check Login
useEffect(() => {
  const checkLogin = async () => {
    const id = await AsyncStorage.getItem('USERID');
    setLoginid(id);
  };
  checkLogin();
  }, []);

  // cartValue
  const checkcart = ()=>{
    setLength(cartdata.length)
    console.log(cartdata.length)

  }

  // Check Cart
  // useEffect(() => {
    
  //   checkcart()
  // }, [isfocused])
  
  

  // getCartData

  const getCartData = async () => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      const cartSnapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('cart')
        .get();

      const cartItems = [];
      cartSnapshot.forEach(doc => {
        const item = doc.data();
        item.id = doc.id;
        cartItems.push(item);
      });
      setCartdata(cartItems);
      
    } catch (error) {
      console.error('Error getting cart data:', error);
    }
  };

  useEffect(() => {
    getCartData();
  }, [isfocused]);

  // DeleteCartItem

  const deletecartItem = async id => {
    const UserId = await AsyncStorage.getItem('USERID');
    cartdata.forEach(itemid => {
      firestore()
        .collection('users')
        .doc(UserId)
        .collection('cart')
        .doc(id)
        .delete();
      const updatedCartData = cartdata.filter(item => item.id !== id);
      setCartdata(updatedCartData);
    });
  };

  // Total cart data

  const totalcart = () => {
    try {
      let total = 0;
      cartdata?.map(item => {
        total = total + item.Product.price;
      });
      return total.toLocaleString('en-US');
    } catch (error) {
      console.log(error);
    }
  };
  
  // Check Address

  useEffect(() => {
    const checkaddress = async()=>{
      try {
        const id = await AsyncStorage.getItem('USERID')
        const add = firestore().collection('users')
        const doc = await add.doc(id).get()
        if(doc.exists){
          const userdoc = doc.data();
          setAddress(userdoc.address)
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkaddress()
  }, [isfocused])
  
  





  return (
    <View style={{flex: 1}}>
      <FlatList
        data={cartdata}
        renderItem={({item, index}) => (
          <TouchableOpacity>
            <View
              style={{
                width: width - 15,
                borderWidth: 1,
                flexDirection: 'row',
                alignSelf: 'center',
                margin: 10,
                height: 130,
              }}>
              <View style={{width: 110, height: '100%'}}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: item.Product?.image}}
                />
              </View>
              <View style={{padding: 10, overflow: 'hidden', width: '70%'}}>
                <Text style={{color: 'black'}}>{item.Product?.title.substring(0,30)}...</Text>
                <Text style={{color: 'black', fontSize: 20, marginTop: 5}}>
                  ₹ {item.Product?.price}
                </Text>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",marginTop:10}}>
                <TouchableOpacity onPress={()=>props.navigation.navigate("Buy",{cartdata:item.Product?.id})} >
                  <Text style={{backgroundColor:"green",padding:12,color:"white",marginEnd:5,borderRadius:10}}>Buy Now</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deletecartItem(item?.id)}>
                  <Text style={{backgroundColor:"#dc3545",padding:12,color:"white",borderRadius:10}}
                    >
                    Remove
                  </Text>
                </TouchableOpacity>

                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

     {address?<Text></Text>:<View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",margin:10}}>
      <Text style={{fontSize:25,color:"black",margin:10}}>Address Details</Text>  
      <TouchableOpacity onPress={()=>props.navigation.navigate("Address")}>
        <Text style={{fontSize:20,color:"blue"}}> + Add Address</Text>
      </TouchableOpacity>
     </View>}
      
      
      {cartdata.length > 0 ? <View style={styles.bottombuttonparent}>
        <TouchableOpacity
          onPress={() => {
            var options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.jpg',
              currency: 'INR',
              key: 'rzp_test_UMGXxC8J058mtm',
              amount: totalcart() * 100,
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
          style={styles.placedbutton} >
          <Text style={styles.buttonstyle}>Place Order ₹ {totalcart()} </Text>
        </TouchableOpacity>
      </View>:<Text  style={{flex:1,alignSelf:"center",fontSize:25}}>Please add the item in the Cart</Text>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  bottombuttonparent: {
    width: width,
    borderTopWidth: 1,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placedbutton: {
    backgroundColor: 'green',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonstyle: {
    color: 'white',
    fontSize: 20,
  },
});

export default Cart;
