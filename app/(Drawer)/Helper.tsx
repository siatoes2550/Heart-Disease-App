import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemedText, ThemedView, usecustomthemedcolor } from '@/Hooks/ThemeManager'
import { currentwindowdimention, Useicon } from '@/Hooks/DynamicElements'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { langcontext } from '@/Hooks/ContextProvider'
import { getLocales } from 'expo-localization'
import { localization } from '@/Constant/Localization'
import { Image } from 'expo-image'
import { giveresponse } from '@/Constant/Assistlist'
import { isweb } from '@/Hooks/DynamicElements'

const router = useRouter()

const Chat = () => {
  const isfocused = useSharedValue(false);
  const isresponding = useSharedValue(false)
  const ismodalopen = (false);

  type typingeffect = {
    text: string,
  };

  const TypingEffect = ({ text }:typingeffect) => {
    const [displayedText, setDisplayedText] = useState('');
    const delay = 10
  
    useEffect(() => {
      let index = 0;
      let prevChar = ''; 
      const intervalId = setInterval(() => {
        if (index < text.length) {
          const currentChar = text[index];
          if (currentChar === 'ั' && prevChar === '') {
            // If it's the first character and it's "ั", skip this iteration and wait
            return;
          } // Thank chatgpt for fix on stupid thai sara render bug
          setDisplayedText((prevText) => prevText + currentChar);
          prevChar = currentChar;
          index += 1;
        } else {
          clearInterval(intervalId);
        }
      }, delay);
      return () => clearInterval(intervalId);
    }, [text]);
    return (
      <ThemedText style={chatstyle.chatmsg} type="semibold">
        {displayedText}
      </ThemedText>
    );
  };
  
  

  const performresponse = ({messagetosend, triggeresponse}:any) => {
    if (isresponding.value == false){
      const usertext:data = {message:messagetosend, messagetype:"user"};
      chathistory.push(usertext)
      let res = giveresponse(triggeresponse) || "not found"
      const text:data = {message:res, messagetype:"response"}
      chathistory.push(text)
      isfocused.value = !isfocused.value
      console.log(chathistory)
    }
  };
  
  const totalbarheight = isweb() == true? ((currentwindowdimention.height * 42.5)/100) + 8 : ((currentwindowdimention.height * 50)/100) + 8;

  const Chatbubble = ({message, messagetype}:data) => {
    if (messagetype === "response"){
      return(
        <View style = {[chatstyle.chatsecondarycontainer,{flexDirection: "row"}]}>
          <Image source={require("@/assets/images/Scale2.png")} style={chatstyle.helpinghane}>
          </Image>
          <ThemedView style={[chatstyle.chatbubble,{borderTopLeftRadius:3}]} ColorToUse='selectoractive'>
            <TypingEffect text={message}></TypingEffect>
          </ThemedView>
        </View>
      )
    }if (messagetype === "user"){
      return(
        <View style = {[chatstyle.chatsecondarycontainer,{flexDirection: "row-reverse"}]}>
          <ThemedView style={[chatstyle.chatbubble,{borderTopLeftRadius:3}]} ColorToUse='userchat'>
            <ThemedText type='semibold' style={chatstyle.chatmsg}>{message}</ThemedText>
          </ThemedView>
        </View>
      )
    }
  };

  const chathistory:data[] = []

  const Actionmenu = ({onboard, triggeresponse, displaytemplate, primarytext = "", img}:templatedata) => {
    return (
      <Pressable style={[chatstyle.action, {height:totalbarheight}]} onPress={()=>performresponse({triggeresponse: triggeresponse, messagetosend: displaytemplate})}>
        <Image source={img} style={chatstyle.image} contentFit={"contain"}></Image>
        <View style={chatstyle.imagecontainer}>
          <ThemedText style={{fontFamily:"RobotocondensedBold", fontSize: isweb() == true? 24:16, textAlign: "center"}}>{displaytemplate}</ThemedText>
        </View>
      </Pressable>
    )
  };

  const {language, setpreferedlanguage} = useContext(langcontext)
  const textbarheight = () => {
    if (isweb() == true){
      return ((currentwindowdimention.height*5.5)/100) 
    }else{
      return ((currentwindowdimention.height*7.5)/100) 
    }
  };

  const animatedbarpc = useAnimatedStyle(() => ({
    height: isfocused.value == true? withTiming(((currentwindowdimention.height * 42.5)/100 + 8)):withTiming(((currentwindowdimention.height * 5.5)/100 + 8)),
  }));
  const animatedbarmobile = useAnimatedStyle(() => ({
    height: isfocused.value == true? withTiming(((currentwindowdimention.height * 50)/100 + 8)):withTiming(((currentwindowdimention.height * 7.5)/100 + 8)),
  }));

  const animatedbutton = useAnimatedStyle(()=>({
    transform:[{  rotate: isfocused.value == true? withSpring('180deg', {duration:800}):withTiming('0deg')}],
  }));

  const animatedbarbottommobile = useAnimatedStyle(() => ({
    height: isfocused.value == true? withTiming("80%"):withTiming("10%"),
  }));

  const rendertext = ({item}:any) => (
    <Chatbubble message={item.message} messagetype={item.messagetype}></Chatbubble>
  );
  const rendercontext = ({item}:any) => (
    <Actionmenu primarytext={item.primarytext} onboard={item.onboard} displaytemplate={item.displaytemplate} triggeresponse={item.triggeresponse} img={item.img}></Actionmenu>
  );

  const onpressmenu = () =>{
    isfocused.value = !isfocused.value
    console.log(isfocused.value)
    console.log(language)
  };

  useEffect(()=>{
    console.log(totalbarheight - 15)
  });

  return (
    <ThemedView style = {chatstyle.background}>
      <ThemedView ColorToUse='universalUI' style={chatstyle.header}>
        <Pressable style ={chatstyle.headerreturnbutton} onPress={() => router.push('/(Drawer)')}>
            <Ionicons name="chevron-back-sharp" size={isweb() == true? 32:12} color={usecustomthemedcolor("text")}/>
        </Pressable>
        <ThemedText style={chatstyle.headertext}>{localization("helper")}</ThemedText>
      </ThemedView>
      <FlatList data={chathistory} renderItem={rendertext} style={[chatstyle.flatlist]} contentContainerStyle={chatstyle.contentflatlist}>
      </FlatList>
      <Animated.View style = {[chatstyle.underbuttontext, isweb() == true? animatedbarpc:animatedbarmobile]} >
        <Pressable style={[chatstyle.openbuttoncontainer,{height:textbarheight()}]} onPress={()=>onpressmenu()} >
          <ThemedText style = {chatstyle.typebar}>{localization("actionbar")}</ThemedText>
          <Animated.View style={animatedbutton}>
            <Entypo name="chevron-up" size={isweb() == true? 32:24} color={usecustomthemedcolor("text")}/>
          </Animated.View>
        </Pressable>
        <View style={[chatstyle.actionpanel]}>
          <FlatList data={templatedata} renderItem={rendercontext} style={[chatstyle.contextlist,]} contentContainerStyle={chatstyle.contentcontainer}>

          </FlatList>
        </View>
      </Animated.View>
    </ThemedView>
  )
}

type data = {
  message: string,
  id?: number,
  messagetype: "user" | "response"
};

interface askresponse {
  trigger: typeof Object.values
}

type templatedata = {
  onboard: number,
  triggeresponse: string,
  displaytemplate: string,
  primarytext?:string,
  img: React.FC,
}

const templatedata:templatedata[] = [
  {
    displaytemplate: localization("Heart1"),
    onboard:1,
    triggeresponse: "valid",
    img: require("@/assets/images/whatishg.svg")
  },
  {
    displaytemplate: localization("Heart2"),
    onboard:2,
    triggeresponse: "valid",
    img: require("@/assets/images/relax.svg")
  },
  {
    displaytemplate: localization("Heart3"),
    onboard:3,
    triggeresponse: "valid",
    img: require("@/assets/images/heart.svg")
  },
  {
    displaytemplate: localization("Heart4"),
    onboard:4,
    triggeresponse: "valid",
    img: require("@/assets/images/chill.svg")
  }
]

const chatstyle = StyleSheet.create({
  background:{
    flex:1
  },
  header:{
    height: isweb() == true? "8%":"10%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row"
  },
  headertext:{
    fontSize: isweb() == true? 30:14,
    marginLeft: 12,
    fontFamily: "RobotoCondensedSemiBold"
  },
  headerreturnbutton:{
    marginLeft: isweb() == true? 9:6,
    width: isweb() == true? 36:16,
    height: isweb() == true? 36:16,
    justifyContent: "center",
    alignItems: "center"
  },
  flatlist:{
    width: isweb() == true? "100%":"33%",
    flexDirection:"row"
  },
  contentflatlist:{
    height: isweb() == true? "auto":undefined,
    marginTop:12,
    gap: isweb() == true? 8:6,
    marginBottom: isweb() == true? 8:16,
    width:"100%",
    paddingHorizontal: 14,
  },
  helpinghane: {
    borderRadius: 9999,
    width: 50,
    height: 50,
    marginRight: 8,
  },
  chatbubble:{
    marginTop: 10,
    width: isweb() == true? (currentwindowdimention.width*30)/100:(currentwindowdimention.width*75)/100,
    borderRadius: isweb() == true? 6: 5,
    padding: 12,
    flexGrow: 0,
  },
  chatmsg:{
    fontSize: 22,
  },
  chatsecondarycontainer:{
    width:"100%",
    minWidth: "100%",
    height:"auto",
  },
  underbuttontext:{
    width:"100%",
    alignItems:"center",
    paddingHorizontal: 12,
    justifyContent: "flex-start",
    backgroundColor: usecustomthemedcolor("uiinner"),
    alignContent: "center",
    paddingTop: 8,
  },
  openbuttoncontainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"flex-start",
    width:"100%",
  },
  typebar:{
    width:"auto",
    height:"auto",
    borderRadius: 8,
    padding: 4,
    fontSize: 24,
    fontFamily: "RobotoCondensedSemiBold",
    marginRight: 8,
  },
  buttoncontainer:{
    width: "auto",
    height: "auto",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 2
  },
  actionpanel:{
    width:"100%",
  },
  action:{
    justifyContent:"center",
    alignItems: "center",
    width: isweb() == true? 275:150,
    marginTop: -25,
  },
  contextlist:{
    width:"100%",
  },
  contentcontainer:{
    flexDirection:"row", 
    alignItems:"center",
    justifyContent:"center",
    alignContent:"center",
    gap: 20,
    width:"100%"
  },
  image:{
    width: isweb() == true? 150:66,
    height: isweb() == true? 150:66,
    justifyContent: "center",
    alignItems:"center",
  },
  imagecontainer:{
    width: "100%",
    height: isweb() == true? 75:30,
    justifyContent: "center",
    alignItems:"center",
  }
})
export default Chat