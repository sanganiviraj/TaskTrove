import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { horizontalScale, verticalScale } from '../Assets/Constant'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splashscreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            checkout()
        },2000)
    },[])

    const checkout = async() => {
        try{
          const token = await AsyncStorage.getItem("authtoken");
          if(token){
            navigation.replace('bottombar')
          }else{
            navigation.replace('signup')
          }
        }catch(e){
          console.log("error => " , e);
        }
      }

  return (
    <View style={{backgroundColor:'black' , flex:1,justifyContent:"center",alignItems:'center'}}>
      <Image style={{height:horizontalScale(300),width:verticalScale(300)}} source={require("../Assets/TaskTrove.png")}/>
    </View>
  )
}

export default Splashscreen

const styles = StyleSheet.create({})