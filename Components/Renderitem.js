import { View, Text,FlatList,TouchableOpacity,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useRoute } from '@react-navigation/native'
import { Homestyle } from '../Stylesheets/Home'
import Star from './Star'

const Renderitem = (props) => {
    const [catdata, setCatdata] = useState([])
    const route = useRoute()
    const categoryname = route.params.item

   const getcategoriesdata = async()=>{
    const url = `https://fakestoreapi.com/products/category/${categoryname}`
    let result = await fetch(url)
    result = await result.json();
    setCatdata(result)
   }

   useEffect(() => {
     getcategoriesdata();
   }, [])
   


  return (
    <View>
      <FlatList 
      numColumns={2}
        data={catdata}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={Homestyle.list} onPress={()=>props.navigation.navigate('Singleproduct',{item})}>
                <View
                  style={Homestyle.imageparent}>
                    <Image source={{uri:item.image}} style={{height:"100%",width:"100%",objectFit:"contain",}}/>
                  </View>
                <View
                  style={Homestyle.textparent}>
                    <Text style={Homestyle.titletext}>{item.title.substring(0,20)}...</Text>
                    <Text style={Homestyle.price}>₹ {item.price}</Text>
                    <View style={Homestyle.rating}>
                      <Text><Star rating={item.rating.rate}/></Text>
                      <Text> ({item.rating.count})</Text>
                    </View>
                  </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item=>item.id}
      />
    </View>
  )
}

export default Renderitem