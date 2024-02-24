import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { secondarycolor } from '../Assets/Colors';
import Icon, { Icons } from '../Assets/Icons';
import { horizontalScale, moderateScale, verticalScale, windowWidth } from '../Assets/Constant';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Calender = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedate, setselectedate] = useState(today);
  const [todo, settodo] = useState([]);
  const [open, setopen] = useState(false);

  const fetchtodo = async () => {
    try {
      const response = await axios.get(`http://192.168.238.141:3000/todos/completed/${selectedate}`);

      const completedtodo = response.data.completedTodos || [];
      settodo(completedtodo);

    } catch (e) {
      console.log("error => ", e);
    }
  }

  // useFocusEffect(() => {
  //   fetchtodo();
  // }, [selectedate])

  useEffect(() => {
    fetchtodo();
  }, [selectedate])

  console.log("todos => ", todo);

  const handpressday = (day) => {
    setselectedate(day.dateString)
  }

  const onlayotpress = () => {
    LayoutAnimation.easeInEaseOut();
    setopen(!open)
  }


  return (
    <View style={styles.screen}>
      <Calendar
        onDayPress={handpressday}
        markedDates={{
          [selectedate]: { selected: true, selectedColor: secondarycolor }
        }}

      />

      <ScrollView>
      {
        todo?.length > 0 ?
          (
            <View>
              <View style={{ width: (windowWidth * 90) / 100, alignSelf: 'center', flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: verticalScale(25) }}>
                <Text style={{ color: secondarycolor, fontSize: moderateScale(18), fontFamily: "Outfit-Medium" }}> completedTodo </Text>

                <TouchableOpacity onPress={() => { onlayotpress() }}>
                  <Icon type={Icons.AntDesign} name={open ? "downcircle" : "upcircle"} size={moderateScale(24)} color="black" />
                </TouchableOpacity>
              </View>

              {open &&
                todo?.map((item) => (
                  <View style={styles.todostyle}>
                    <Icon type={Icons.Entypo} name="circle-with-minus" size={moderateScale(20)} color="black" />
                    <Text style={[styles.liststyle, { textDecorationLine: 'line-through' }]}>{item.title}</Text>
                  </View>))
              }
            </View>
          ) :
          (
            <Text style={styles.todotitle}> No Any Todo Available </Text>
          )
      }
      </ScrollView>
    </View>
  )
}

export default Calender

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  todostyle: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: moderateScale(15),
    backgroundColor: "rgba(255, 124, 115, 0.55)",
    padding: moderateScale(15),
    marginVertical: verticalScale(10),
    flexDirection: "row"
  },
  liststyle: {
    marginHorizontal: horizontalScale(5),
    fontSize: moderateScale(16),
    color: 'black',
    fontFamily: "Outfit-Regular"
  },
  todotitle: {
    color: secondarycolor,
    fontSize: moderateScale(18),
    fontFamily: "Outfit-Medium",
    marginLeft: horizontalScale(20),
    alignSelf: 'center', 
    marginTop: verticalScale(25)
  }
})