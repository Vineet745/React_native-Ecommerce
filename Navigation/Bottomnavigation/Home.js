import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Homestyle} from '../../Stylesheets/Home';
import Star from '../../Components/Star';
const {width, height} = Dimensions.get('window');
const Home = props => {
  const [data, setdata] = useState([]);

  const Getallproducts = async () => {
    try {
      const url = 'https://fakestoreapi.com/products';
      let result = await fetch(url);
      result = await result.json();
      setdata(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getallproducts();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={Homestyle.list}
              onPress={() =>
                props.navigation.navigate('Singleproduct', {item})
              }>
              <View style={Homestyle.imageparent}>
                <Image
                  source={{uri: item.image}}
                  style={{height: '100%', width: '100%', objectFit: 'contain'}}
                />
              </View>
              <View style={Homestyle.textparent}>
                <Text style={Homestyle.titletext}>
                  {item.title.substring(0, 20)}...
                </Text>
                <Text style={Homestyle.price}>₹ {item.price}</Text>
                <View style={Homestyle.rating}>
                  <Star rating={item.rating.rate} starSize={10} />
                  <Text style={{fontSize: 15, color: 'blue'}}>
                    {' '}
                    ({item.rating.count})
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Home;
