import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { horizontalScale, moderateScale, verticalScale, windowWidth } from '../Assets/Constant'
import { TextInput } from 'react-native-gesture-handler'
import Icon, { Icons } from '../Assets/Icons'
import { primarycolor, secondarycolor } from '../Assets/Colors'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Signupscreen = ({navigation}) => {
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [pass,setpass] = useState('');

  const [namepress , setnamepress] = useState(false);
  const [emailpress , setemailpress] = useState(false);
  const [passpress , setpasspress] = useState(false);

  useEffect(() => {
    const logincheck = async() => {
      try{
        const token = await AsyncStorage.getItem("authtoken");
        if(token){
          navigation.replace('bottombar')
        }
      }catch(e){
        console.log("error => " , e);
      }
    }

    logincheck()
  },[]) 


  const _onadddata = () => {
    const user = {
      name:name,
      email:email,
      password:pass
    }

    console.log(name , " " , email ,  " " , pass );

      axios.post("http://192.168.238.141:3000/register",user)
        .then((response) => {
            console.log(response);
            console.log('ok');
            Alert.alert('successful')
            navigation.replace('bottombar')
        }).catch((error) => {
            console.log("Errors => " ,error);
        })
    
    console.log("hi");
  }

  return (
    <View style={styles.screen}>
        <Text style={{color:"black",marginTop:verticalScale(100),marginLeft:horizontalScale(10),fontSize:moderateScale(35),fontWeight:500,fontFamily:'Outfit-SemiBold',marginBottom:verticalScale(50)}}> Welcome back </Text>

        <Text style={styles.inputitle}> Name </Text>

        <View style={styles.inputstyle}>
          <Icon type={Icons.FontAwesome} name="user" size={moderateScale(20)} color= { !namepress ? "rgba(255, 124, 115, 0.55)" : secondarycolor } />

          <TextInput
              style={styles.inputdesign}
              placeholder='Enter Name'
              placeholderTextColor="grey"
              value={name}
              onChangeText={(text) => {setname(text)}}
              maxLength={35}
              onFocus={() => {setnamepress(true)}}
              onBlur={() => {setnamepress(false)}}
          />
            
        </View>

        <Text style={[styles.inputitle,{marginTop:verticalScale(30)}]}> Username </Text>

        <View style={styles.inputstyle}>
          <Icon type={Icons.MaterialCommunityIcons} name="email" size={moderateScale(20)} color={ !emailpress ? "rgba(255, 124, 115, 0.55)" : secondarycolor }/>

          <TextInput
              style={styles.inputdesign}
              placeholder='Enter email'
              placeholderTextColor="grey"
              value={email}
              onChangeText={(text) => {setemail(text)}}
              maxLength={35}
              onFocus={() => {setemailpress(true)}}
              onBlur={() => {setemailpress(false)}}
          />
            
        </View>

        <Text style={[styles.inputitle,{marginTop:verticalScale(30)}]}> Password </Text>

        <View style={styles.inputstyle}>
          <Icon type={Icons.MaterialIcons} name="password" size={moderateScale(20)} color={ !passpress ? "rgba(255, 124, 115, 0.55)" : secondarycolor }/>

          <TextInput
              style={styles.inputdesign}
              placeholder='Password'
              placeholderTextColor="grey" 
              value={pass}
              secureTextEntry
              onChangeText={(text) => {setpass(text)}}
              maxLength={35}
              onFocus={() => {setpasspress(true)}}
              onBlur={() => {setpasspress(false)}}
          />
            
        </View>

        <Text style={[styles.btntitle,{alignSelf:'center',marginVertical:moderateScale(10)}]}>Already have an account?<Text style={{fontSize:moderateScale(18),color:secondarycolor,fontFamily:'Outfit-Medium'}} onPress={() => {navigation.push("login")}}> Sign in </Text></Text>

        <TouchableOpacity style={styles.btn} onPress={() => {_onadddata()}}>
            <Text style={{color:'black',fontSize:moderateScale(20),fontFamily:'Outfit-Medium'}}> Sign up </Text>
        </TouchableOpacity>
          
    </View>
  )
}

export default Signupscreen

const styles = StyleSheet.create({
  screen:{
    flex:1
  },
  inputitle:{
    fontSize:moderateScale(20),
    fontFamily:'Outfit-Medium',
    color:'black',
    marginLeft:horizontalScale(15)
  },
  inputstyle:{
    borderBottomWidth:1,
    borderColor:'black',
    width:(windowWidth*90)/100,
    alignSelf:'center',
    padding:moderateScale(4),
    flexDirection:'row',
    alignItems:'center'
  },
  inputdesign:{
    padding:moderateScale(5),
    color:"black",
    fontSize:moderateScale(16),
  },
  btn:{
    backgroundColor:secondarycolor,
    borderRadius:moderateScale(10),
    width:(windowWidth*90)/100,
    height:moderateScale(45),
    alignSelf:'center',
    alignItems:"center",
    justifyContent:'center',
    
  },
  btntitle:{
    fontSize:moderateScale(16),
    color:"black",
    fontFamily:'Outfit-Regular',
    marginTop:(moderateScale(60))
  },
})