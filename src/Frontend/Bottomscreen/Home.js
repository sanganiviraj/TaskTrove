import { Image, StyleSheet, Text, View ,ScrollView , TouchableOpacity, TextInput , LayoutAnimation, Platform, UIManager} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { horizontalScale, moderateScale, verticalScale, windowWidth } from '../Assets/Constant'
import { secondarycolor } from '../Assets/Colors'
// import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon, { Icons } from '../Assets/Icons'
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import axios from 'axios'
import moment, { min } from 'moment'


const data = [
  {
    category:"All",
    id:1
  },
  {
    category:"Work",
    id:2
  },
  {
    category:"Personal",
    id:3
  }
]

const personaldata = [
  {
    category:"Work",
    id:1
  },
  {
    category:"Personal",
    id:2
  },
  {
    category:"Wishlisht",
    id:3
  }
]

const suggetiondata = [
  {
    category:"go to bed",
    id:1
  },
  {
    category:"go to gym",
    id:2
  },
  {
    category:"Exam",
    id:3
  }
]

if(Platform.OS =="android") {
  if(UIManager.setLayoutAnimationEnabledExperimental){
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const Home = ({hideBottomBar, setHideBottomBar}) => {
  // const todos = [];
  const today = moment().format("MMM Do YY");
  const [visible,setvisible] = useState(false);
  const [mark,setmark]= useState(false)
  const [todoitem , settodoitem] = useState('');
  const [todopress ,settodopress] = useState(false);
  const [datas,setdatas] = useState("");
  const [personaldatas,setpersonaldatas] = useState("");
  const [suggetiondatas,setsuggetiondatas] = useState("");
  const [todos , settodos] = useState([]);

  const [pendingtodo , setpendingtodo] = useState([]);
  const [completedtodo , setcompletedtodo] = useState([]);

  const [open,setopen] = useState(false);
  
  const sheetRef = useRef(null);

  console.log("datas => " , datas);
  console.log("personaldatas => " , personaldatas);
  console.log("suggetiondatas => " , suggetiondatas);

  useEffect(() => {
    getusertodo()
  },[mark,sheetRef])

  const onlayotpress = () => {
    LayoutAnimation.easeInEaseOut();
    setopen(!open)
  }

  const markasTodocompleted = async(todoId) => {
    try{
      setmark(true);
      const response  = await axios.patch(`http://192.168.238.141:3000/todos/${todoId}/complete`)
      // console.log("response +> ",response);
    }catch(e){
      console.log("e => " , e);
    }
  }

  const getusertodo = async() => {
    try{
      const response = await axios.get("http://192.168.238.141:3000/users/65d1feecde3471a73e27cca9/todos").catch((E) => console.log(E));

      settodos(response.data.todos);

      const fetchtodo = response.data.todos || [];

      const pending = fetchtodo.filter((todo) => todo.status !== "completed");
      const completed = fetchtodo.filter((todo) => todo.status === "completed");

      setpendingtodo(pending);
      setcompletedtodo(completed);
      setmark(false)
    }catch(e){
      console.log("error => " , e);
    }
  }

  const addtodo = async() => {
    const todo = {
      title:todoitem,
      category: datas
    }

    try{
      axios.
      post("http://192.168.238.141:3000/todos/65d1feecde3471a73e27cca9" , todo)
      .then((response) => {
        console.log(response);
        getusertodo()
      })
      .catch((error) => {
        console.log("error =>" , error);
      });
      
      
      sheetRef.current.close()
      settodoitem("");
      
    }catch(E){
      console.log("e => " , E);
    }
    

  }

  console.log("pending = >" , pendingtodo);
  console.log("completed = >" , completedtodo);

  return (
    <View style={{ flex: 1 }}>

      {/* Category - All , Work , Personal */}
      <View style={{ marginTop: horizontalScale(20), flexDirection: 'row', justifyContent: "space-between", marginHorizontal: moderateScale(10) }}>
        <View style={{ flexDirection: 'row' }}>
          {
            data.map((item, index) => (
              <TouchableOpacity onPress={() => { setdatas(item.category) }} key={index}>
                <View style={styles.categorybox}>
                  <Text style={{ color: "black", fontSize: moderateScale(20), fontFamily: "Outfit-Medium" }}> {item.category}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>

        <TouchableOpacity onPress={() => { sheetRef.current.open() }}>
          <Icon type={Icons.Ionicons} name="add" size={moderateScale(50)} color={secondarycolor} />
        </TouchableOpacity>

      </View>

      <ScrollView style={{ marginTop: verticalScale(30) }}>
        {
          todos?.length > 0 ?
            (
              <View>
                {
                  pendingtodo?.length > 0 && <Text style={{ color: secondarycolor, fontFamily: "Outfit-Medium", fontSize: moderateScale(20), marginLeft: moderateScale(15) }}> Tasks To do! {today}</Text>
                }

                {
                  pendingtodo?.map((item) => (
                    <View style={styles.todostyle}>
                      <TouchableOpacity onPress={() => { markasTodocompleted(item?._id) }}>
                        <Icon type={Icons.Entypo} name="circle" size={moderateScale(20)} color="black" />
                      </TouchableOpacity>
                      <Text style={styles.liststyle}>{item.title}</Text>
                    </View>
                  ))
                }

                {
                  completedtodo?.length > 0 && (
                    <View >
                      <View style={{ width: (windowWidth * 90) / 100, alignSelf: 'center', flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: secondarycolor, fontSize: moderateScale(18), fontFamily: "Outfit-Medium" }}> completedTodo </Text>

                        <TouchableOpacity onPress={() => { onlayotpress() }}>
                          <Icon type={Icons.AntDesign} name={open ? "downcircle" : "upcircle"} size={moderateScale(24)} color="black" />
                        </TouchableOpacity>
                      </View>

                      {open &&
                        completedtodo?.map((item) => (
                          <View style={styles.todostyle}>
                            <Icon type={Icons.Entypo} name="circle-with-minus" size={moderateScale(20)} color="black" />
                            <Text style={[styles.liststyle, { textDecorationLine: 'line-through' }]}>{item.title}</Text>
                          </View>
                        ))
                      }
                    </View>
                  )
                }
              </View>
            )
            :
            (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <Image style={{ height: verticalScale(200), width: horizontalScale(180) }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/6194/6194029.png" }} />

                <Text style={{ color: "black", fontSize: moderateScale(20), fontFamily: "Outfit-Medium" }}> No Task Today! Add Task</Text>

                <TouchableOpacity onPress={() => sheetRef.current.open()}>
                  <Icon type={Icons.Ionicons} name="add" size={moderateScale(50)} color={secondarycolor} />
                </TouchableOpacity>

              </View>
            )
        }
      </ScrollView>

      {/* Bottomslider   */}
      <BottomSheet ref={sheetRef}>
        <Text style={{alignSelf:"center",color:secondarycolor,fontFamily:"Outfit-Medium",fontSize:moderateScale(20)}}> Add Todo </Text>

        <View style={styles.inputstyle}>

          <View style={{flexDirection:"row",alignItems:"center",width:(windowWidth*70)/100}}> 
            <Icon type={Icons.FontAwesome5} name="tasks" size={moderateScale(20)} color={ !todopress ? "rgba(255, 124, 115, 0.55)" : secondarycolor } style={{marginRight:moderateScale(10)}}/>

              <TextInput
                  style={styles.inputdesign}
                  placeholder='Add Task'
                  placeholderTextColor="grey" 
                  value={todoitem}
                  onChangeText={(text) => {settodoitem(text)}}
                  onFocus={() => {settodopress(true)}}
                  onBlur={() => {settodopress(false)}}
              />
          </View>

            <TouchableOpacity onPress={() => {addtodo()}}>
              <Icon type={Icons.Ionicons} name="add-circle" size={moderateScale(30)} color={ !todopress ? "rgba(255, 124, 115, 0.55)" : secondarycolor } style={{marginLeft:moderateScale(10)}} />
            </TouchableOpacity>

        </View>

          <View style={{marginTop:horizontalScale(20),flexDirection:'row',justifyContent:"space-between",marginHorizontal:moderateScale(10)}}>
            <View style={{flexDirection:'row'}}>
              {
                personaldata.map((item) =>(
                  <TouchableOpacity onPress={() => {setpersonaldatas(item.category)}}>
                    <View style={[styles.categorybox]}>
                      <Text style={{color:"black",fontSize:moderateScale(16),fontFamily:"Outfit-Medium"}}> {item.category}</Text>
                    </View> 
                  </TouchableOpacity>
                ))
              }
            </View> 
          </View>

          <Text style={{fontFamily:"Outfit-Medium",fontSize:moderateScale(17),color:secondarycolor,marginVertical:verticalScale(10),marginLeft:horizontalScale(10)}}> Some Suggestion</Text>
            <View style={{flexDirection:'row'}}>
                {
                  suggetiondata.map((item) =>(
                    <TouchableOpacity onPress={() => {setsuggetiondatas(item.category)}}>
                      <View style={[styles.categorybox,{backgroundColor:"rgba(255, 124, 115, 0.55)",padding:moderateScale(8)}]}>
                        <Text style={{color:"black",fontSize:moderateScale(16),fontFamily:"Outfit-Medium"}}> {item.category}</Text>
                      </View> 
                    </TouchableOpacity>
                  ))
                }
            </View> 
      </BottomSheet>
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  categorybox:{
    padding:moderateScale(10),
    borderRadius:moderateScale(15),
    backgroundColor:secondarycolor,
    marginHorizontal:horizontalScale(5)
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
    alignItems:'center',
    justifyContent:'space-between'
  },
  inputdesign:{
    padding:moderateScale(5),
    color:"black",
    fontSize:moderateScale(16),
  },
  todostyle:{
    width:(windowWidth*90)/100,
    alignSelf:"center",
    alignItems:"center",
    borderRadius:moderateScale(15),
    backgroundColor:"rgba(255, 124, 115, 0.55)",
    padding:moderateScale(15),
    marginVertical:verticalScale(10),
    flexDirection:"row"
  },
  liststyle:{
    marginHorizontal:horizontalScale(5),
    fontSize:moderateScale(16),
    color:'black',
    fontFamily:"Outfit-Regular"
  }
})