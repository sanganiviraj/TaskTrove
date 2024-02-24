import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Bottomscreen/Home';
import Calender from './Bottomscreen/Calender';
import Profile from './Bottomscreen/Profile';
import Signupscreen from './Login_Signup/Signupscreen';
import Loginscreen from './Login_Signup/Loginscreen';
import { secondarycolor } from './Assets/Colors';
import Icon, { Icons } from './Assets/Icons';
import { moderateScale } from './Assets/Constant';
import Splashscreen from './Login_Signup/Splashscreen';

const stack = createStackNavigator();
const tab = createBottomTabNavigator();



const Navigationscreens = () => {

  const gobackbutton = (navigation) => {
    return(
      <TouchableOpacity onPress={() => { navigation.popToTop()}}>
        <Icon type={Icons.Ionicons} name="arrow-back-outline" color="black" size={moderateScale(30)} style={{padding:moderateScale(10)}}/>
      </TouchableOpacity>
    )
  }
 
  
  return (
    <NavigationContainer>
      <stack.Navigator>
      <stack.Screen component={Splashscreen} name='splash' options={{headerShown:false}}/>
        <stack.Screen component={Signupscreen} name='signup' 
          options={({navigation}) => ({
            headerTitle:"Signup",
            headerTitleAlign:'center',
            headerTintColor:secondarycolor,
            headerTransparent:true,
            headerLeft:() =>(
              gobackbutton(navigation)
            )
          })}
        />
        <stack.Screen component={Loginscreen} name='login' 
          options={({navigation}) => ({
            headerTitle:"Login",
            headerTitleAlign:'center',
            headerTintColor:secondarycolor,
            headerTransparent:true,
            headerLeft:() =>(
              gobackbutton(navigation)
            )
          })}
        />
        <stack.Screen component={Bottomnavigation} name='bottombar' options={{headerShown:false}}/>
      </stack.Navigator>
    </NavigationContainer>
  )
}
 

export const Bottomnavigation = () => {

    return(
        <tab.Navigator screenOptions={{tabBarActiveTintColor:secondarycolor,tabBarHideOnKeyboard:true,}} >
            <tab.Screen component={Home} name='home' 
              options={{
              tabBarIcon:({focused}) => (
                <Icon type={Icons.AntDesign} name="home" color={focused ? secondarycolor : "rgba(255, 124, 115, 0.55)" }/>
              ),
              headerShown:false
              }} 
              
            />
            <tab.Screen component={Calender} name='calender' 
              options={{
                tabBarIcon:({focused}) => (
                  <Icon type={Icons.AntDesign} name="calendar" color={focused ? secondarycolor : "rgba(255, 124, 115, 0.55)" }/>
                )
              }}
            />
            <tab.Screen component={Profile} name='profile'
              options={{
                tabBarIcon:({focused}) => (
                  <Icon type={Icons.AntDesign} name="user" color={focused ? secondarycolor : "rgba(255, 124, 115, 0.55)" }/>
                )
                }}
            />
        </tab.Navigator>
    )
}

export default Navigationscreens

const styles = StyleSheet.create({})