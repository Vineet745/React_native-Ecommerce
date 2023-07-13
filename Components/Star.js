import { View, Text } from 'react-native'
import React,{useState} from 'react'
import StarRating from "react-native-star-rating"


const Star = ({rating}) => {


  return (
    <View >
        <StarRating style={{fontsize:10}}
        disabled={false}
        maxStars={5}
        rating={rating}
        fullStarColor={'#FDCC0D'}
        starSize={20}
        
        
        />
    </View>
  )
}

export default Star