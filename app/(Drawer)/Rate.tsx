import { View, Text, StyleSheet, useColorScheme, Modal } from 'react-native'
import React, { useState } from 'react'
import { ThemedPressable, ThemedText, ThemedView, usecustomthemedcolor } from '@/Hooks/ThemeManager'
import { localization } from '@/Constant/Localization';
import { Pressable, ScrollView, TextInput } from 'react-native-gesture-handler';
import { isweb } from '@/Hooks/DynamicElements';
import { maxratedata, ratedata } from '@/Constant/Ratelist';
import { CircularSelector } from '@/Components/Selector';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { Colorscheme } from '@/Constant/Color';
import { useSharedValue } from 'react-native-reanimated';

const apikey = process.env.EXPO_PUBLIC_APIKEY;
const dataserverlinkrate = process.env.EXPO_PUBLIC_DATA_SERVERRATE;

const rate = () => {
  const [data, setData] = useState<any>({});
  type adddata = {
    argumet: string,
    index: string,
  };
  const addata = ({argumet, index}:adddata) => {
    data[index] = argumet;
    data["key"] = apikey;
    console.log(data)
  };


  const router = useRouter();
  const [isVisible, setisVisible] = useState(false)
  const selected = useSharedValue(0)
  const maxselection = maxratedata()
  const returnhome = () =>{
    setisVisible(false);
    router.replace("/(Drawer)")
  };

  const whenselected = () => {
    selected.value = selected.value + 1
  }

  const Thankmodal = () => {
    return(
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <ThemedView ColorToUse='uiinner' style={stylesheet.Popupmodal}>
          <ThemedText type='bold' style={stylesheet.Textinner}>{localization("Thankforrate")}</ThemedText>
          <ThemedPressable ColorToUse='topbar2' onPress={()=>returnhome()} style={stylesheet.pressablemodal}>
            <ThemedText type='bold' style={stylesheet.Textinner}>Ok</ThemedText>
          </ThemedPressable>
        </ThemedView>
      </Modal>
    )
  };

  const submitting = () =>{
    if (selected.value == maxselection){
      setisVisible(true)
      try {
        fetch(
          dataserverlinkrate,
          {method:"POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          } 
        )
      } catch (error) {
        console.log(error)
      }
    }else{
      console.log(maxselection)
      console.log(selected.value)
    }
  }

  console.log(datarate)
  return (
    <ScrollView style={stylesheet.background}>
      <View style = {stylesheet.marginizedview}>
        <View style={stylesheet.upperbutton}>
          <Pressable style={stylesheet.returnbutton} onPress={()=> router.push("/")}>
            <Ionicons name="arrow-back" size={24} color={usecustomthemedcolor("text")} />
            <ThemedText style={stylesheet.returnbuttontext}>back</ThemedText>
          </Pressable>
          <ThemedText style={stylesheet.headertext}>{localization("Rateus")}</ThemedText>
        </View>
        {datarate.map((data)=>{
          return(
            <CircularSelector onselected={whenselected} parentindex={data.parentindex} description={data.description} priority={data.priority} returns={addata}></CircularSelector>
          )
        })}
        <ThemedView ColorToUse='uiinner' style={stylesheet.containerview}>  
          <ThemedText style={stylesheet.headertext}>{localization("additionalsuggest")}</ThemedText>
          <TextInput multiline={true} style={stylesheet.TextInput} onChangeText={text=>(data["ข้อเสนอแนะเพิ่มเติม"] = text)}>
          </TextInput>
        </ThemedView>
      </View>
      <Pressable onPress={()=>submitting()} style={stylesheet.returnnavbutton}>
        <ThemedText style={stylesheet.buttonfont}>{localization("submit")}</ThemedText>
      </Pressable>
      <Thankmodal>
      </Thankmodal>
    </ScrollView>
  )
};

const stylesheet = StyleSheet.create({
    background:{
      flex:1,
      backgroundColor: usecustomthemedcolor("backgroundcolor")
    },
    headertext:{
      fontSize: isweb() == true? 48:24,
      fontFamily: "RobotoCondensedBold",
      marginTop: 14,
      marginLeft: 12,
      marginBottom:8,
    },
    marginizedview:{
      margin:isweb() == true? 9:5,
      flex:1
    },
    containerview:{
      width: "97.5%",
      height: "auto",
      flexDirection: "column",
      marginTop: 7,
      justifyContent: "center",
      alignContent: "center",
      alignItems:"center",
      paddingVertical: isweb() == true? 20:12,
      borderRadius: 12,
    },
    TextInput:{
      height: "auto",
      minHeight: 300,
      width: isweb() == true? "97.5%":"95%",
      color: usecustomthemedcolor("text"),
      backgroundColor: usecustomthemedcolor("ui2"),
      borderRadius:6,
      fontSize: 18,
      padding:8,
    },
    returnnavbutton:{
      width:"90%",
      height: isweb() == true? 50:40,
      backgroundColor: usecustomthemedcolor("progressbar"),
      borderRadius: 12,
      borderWidth: useColorScheme()==="dark"? 3:0,
      borderColor: usecustomthemedcolor("text"),
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      marginTop: isweb() == true?  12.5: 20,
      marginBottom: 10,
    },
    buttonfont:{
      fontSize: isweb() == true? 26:12,
      textAlign: "center",
      color: usecustomthemedcolor("text"),
    },
    upperbutton:{
      flexDirection:"row",
      width:"100%",
      alignItems:"center",
    },
    returnbutton:{
      width:isweb() == true? "7.5%":"15%",
      height: isweb() == true? 48:24,
      borderRadius: 8,
      backgroundColor: usecustomthemedcolor("uiinner"),
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row"
    },
    returnbuttontext:{
      fontSize: isweb() == true? 28:18,
    },
    Popupmodal:{
      position: "absolute",
      bottom: isweb() == true? "37.5%":"40%",
      borderRadius: isweb() == true? 7:8,
      height: "auto",
      width: isweb() == true? "40%":"60%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf:"center",
      paddingVertical:30,
    },
    Textinner:{
      fontSize: isweb() == true? 28:12,
      textAlign: "center",
    },
    pressablemodal:{
      width: isweb() == true? "60%":"75%",
      height: isweb() == true? 60:30,
      marginTop: isweb() == true? 12:22,
      borderRadius: isweb() == true? 8:6,
      alignItems: "center",
      justifyContent: 'center',
    }
});
type ratedatatype = {
  description: string,
  priority: number,
  parentindex: string,
}
const datarate:ratedatatype[] = Object.entries(ratedata).map(
  ([key, value]) => ({
    description: value.description,
    priority: value.priority,
    parentindex: key,
  })
);

export default rate