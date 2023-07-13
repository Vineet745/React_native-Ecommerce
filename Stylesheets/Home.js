import {StyleSheet, Dimensions} from 'react-native';
export const Homestyle = StyleSheet.create({
  list: {
    width: 185,
    borderRadius: 10,
    height: 250,
    margin: 5,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth:0.5,
    borderColor:"Gray"
  },
  imageparent: {
    flex: 2,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    
  },
  textparent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  titletext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
price:{
    fontSize:15,
    fontWeight:"bold",
    marginTop:5
},
rating:{
    flexDirection:"row",
    marginTop:5,
    width:"90%",
    alignItems:"center"
    

}
});
