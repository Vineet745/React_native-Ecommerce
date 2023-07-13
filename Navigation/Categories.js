import { View, Text,FlatList,TouchableOpacity,Dimensions} from 'react-native'
import React,{useEffect,useState} from 'react'
const {width,height}= Dimensions.get("window")
const Categories =  (props) => {
 const [category, setCategory] = useState([])
  const getcategories = async()=>{
    try {
        const url = "https://fakestoreapi.com/products/categories"
        let result = await fetch(url)
        result = await result.json();
        setCategory(result)
    } catch (error) {
        
    }
  }

  useEffect(() => {
    getcategories();
  }, [])
  


  return (
    <View style={{flex:1}}>
        <FlatList 
        data={category}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={()=>props.navigation.navigate("Renderitem",{item})}>
                <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#78C1F3",width:width,height:150,margin:10,borderRadius:20,elevation:4}}>
                    <Text style={{fontSize:25}} >{item}</Text>
                </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item=>item}
      />
    </View>
  )
}

export default Categories