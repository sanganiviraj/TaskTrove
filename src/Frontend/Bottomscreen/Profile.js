import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { horizontalScale, moderateScale, verticalScale, windowWidth } from '../Assets/Constant';
import { secondarycolor } from '../Assets/Colors';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';

const Profile = () => {
  const [completedtask,setcompletedtask]= useState(0);
  const [pendingtask,setpendingtask] = useState(0);

  const fetchtaskdata = async() => {
    try{
      const response = await axios.get("http://192.168.238.141:3000/todos/count");
      const {totalcompletedtodo,totalpendingtodo} = response.data;

      setpendingtask(totalpendingtodo);
      setcompletedtask(totalcompletedtodo);
    }catch(E){
      console.log("error => " ,E);
    }
  }

  useFocusEffect(() => {
    fetchtaskdata()
    console.log("reloaded");
  })


  console.log("pending => ", pendingtask);
  console.log("completed => ", completedtask);

  return (
    <View style={styles.screen}>

      {/* Userdetail */}
      <View style={[styles.details,{paddingBottom:verticalScale(20)}]}>
        <Image style={styles.img} source={{uri:"https://people.com/thmb/oiFF3GVAhN_G6Jinldcn7rkTHw4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(959x345:961x347)/chris-evans-2-2000-7973e8b1e82648aeb47203ba0fedf2d6.jpg"}}/>

        <View style={styles.detailstyle}>
          <Text style={styles.detailname}> Username </Text>
          <Text style={[styles.detailname,{color:"black",fontSize:moderateScale(14)}]}> Email Address </Text>
        </View>
      </View>

      {/* Taskdetails */}
      <View style={[styles.details,{backgroundColor:"white",justifyContent:'space-between',marginVertical:verticalScale(-10)}]}>
          <View style={styles.taskdetail}>
            <Text style={styles.tasktitle}> {completedtask} </Text>
            <Text style={[styles.tasktitle,{color:"black"}]}> completedtask </Text>
          </View>

          <View style={styles.taskdetail}>
            <Text style={styles.tasktitle}> {pendingtask} </Text>
            <Text style={[styles.tasktitle,{color:"black"}]}> pendingtask </Text>
          </View>
      </View>

      <Text style={[styles.tasktitle,{color:"black",fontSize:moderateScale(24),marginTop:(verticalScale(40)),marginLeft:horizontalScale(20)}]}> Task Overview </Text>

      {/* TaskChart */}
      <LineChart
        data={{
          labels: ["PendingTask", "CompletedTask"],
          datasets: [
            {
              data: [
                pendingtask,completedtask
              ]
            }
          ]
        }}
        width={(windowWidth*90)/100} // from react-native
        height={verticalScale(220)}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "rgba(255, 124, 115, 0.55)",
          backgroundGradientFrom: "rgba(255, 124, 115, 0.55)",
          backgroundGradientTo: "#F7D5D5",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: secondarycolor
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf:"center",
          marginVertical:10,
          
        }}
      />

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:'white'
  },
  details:{
    flexDirection:'row',
    width:(windowWidth*90)/100,
    alignSelf:"center",
    borderRadius:moderateScale(8),
    backgroundColor:"rgba(255, 124, 115, 0.55)",
    padding:moderateScale(5)
  },
  img:{
    width:horizontalScale(60),
    height:60,
    borderRadius:30
  },
  detailname: {
    color: "black",
    fontSize: moderateScale(18),
    fontFamily: "Outfit-Medium",
    marginLeft: horizontalScale(20),
  },
  detailstyle:{
    justifyContent:"center",
    marginLeft:horizontalScale(-10)
  },
  taskdetail:{
    justifyContent:"center",
    alignItems:"center",
    borderRadius:moderateScale(8),
    width:(windowWidth*40)/100,
    height:verticalScale(80),
    backgroundColor:"rgba(255, 124, 115, 0.55)"
  },
  tasktitle:{
    fontSize:moderateScale(18),
    color:'black',
    fontFamily:"Outfit-Medium"
  }
})