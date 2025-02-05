import { View, StyleSheet, Pressable, Dimensions, Modal, useColorScheme } from 'react-native'
import React,{useCallback, useContext, useEffect, useState} from 'react'
import { ThemedPressable, ThemedText, ThemedView, usecustomthemedcolor, usethemedcolor } from '@/Hooks/ThemeManager'
import { useFocusEffect, useRouter } from 'expo-router';
import { accumulatedriskcontext, Globalappcontext, handleformcontext } from '@/Hooks/ContextProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { getmaximumrisk } from '@/Constant/DiagnosisList';
import { Colorscheme } from '@/Constant/Color';
import Progressbar from '@/Components/Progressbar';
import { Image } from 'expo-image';
import { localization } from '@/Constant/Localization';
import { isweb } from '@/Hooks/DynamicElements';
import { Calculate } from '@/Hooks/Calculate';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const result = () => {
  const {accumulatedrisk} = useContext(accumulatedriskcontext);
  const calculatedrisk:number = Math.round(Calculate({totalriskaccumulation:accumulatedrisk}));
  const {hasdone} = useContext(handleformcontext);
  const [colortouse, setcorlotouse] = useState<any>()

    const gradient = () => {
      if (useColorScheme()=="light"){
        if (calculatedrisk <= 20) return(
          [Colorscheme.light.backgroundcolor,"#4b79d7","#764ee3"]
        )
        if (calculatedrisk <= 40) return(
          [Colorscheme.light.backgroundcolor,"#56a93d","#509342"]
        )
        if (calculatedrisk <=60) return(
          [Colorscheme.light.backgroundcolor,"#d8b775","#ea9730"]
        )
        if (calculatedrisk <=80) return(
          [Colorscheme.light.backgroundcolor,"#c65e27","#da6b57"]
        )
        if (calculatedrisk > 80) return(
          [Colorscheme.light.backgroundcolor,"#ca2525","#e12d2d"]
        )
        else{
          return(
            [Colorscheme.light.backgroundcolor,"#2a8affff","#2d426b"]
          )
        }
      }
      else{
        return(
          ["transparent", "transparent","transparent"]
        )
      }
    }

    useEffect(()=>{
      console.log(calculatedrisk)
    })

  const resultstyle = StyleSheet.create({
    Background:{
      flex:1,
      backgroundColor: usecustomthemedcolor("backgroundcolor")
    },
    Topbarr:{
      width: "95%",
      height:"45%",
      alignContent: "center",
      borderRadius: isweb() == true? 16:8
    },
    BgGradient:{
      width:"100%",
      height:"100%",
      alignItems: "center",
      justifyContent:"center",
    },
    innnerview: {
      width: isweb() == true? "60%":"92.5%",
      height: "auto",
      borderRadius: isweb() == true? 16:14,
      minHeight: isweb() == true? "40%":"20%",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: isweb() == true? 16:12,
    },
    containerinnerstyle:{
      width:"100%",
      height: "auto",
      paddingHorizontal: isweb() == true? 16:12,
    },
    headerfont:{
      fontSize: isweb() == true? 32:16,
      textAlign: "left",
      color: usecustomthemedcolor("textdiagui")
    },
    textcontainer:{
      width: "100%",
      height: "auto",
      minHeight: isweb() == true? "27.5%":"10%",
    },
    subheaderfont:{
      fontSize: isweb() == true? 20:12,
      textAlign: "left",
      color: usecustomthemedcolor("secondtextdiaggui"),
      marginTop: isweb() == true? 12:9,
    },
    buttonfont:{
      fontSize: isweb() == true? 26:12,
      textAlign: "center",
      color: usecustomthemedcolor("text"),
    },
    progressbarview:{
      width:"100%",
      height:"auto",
      flexDirection:"row",
      alignItems: "center",
      marginBottom: 6,
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
    illustration:{
      width: isweb() == true? 350:300,
      height: isweb() == true? 300:250,
      marginBottom: isweb() == true?12:3,
    },
    modal:{
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    modalbg:{
      backgroundColor: "#000000b3",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    modalchildren:{
      width:400,
      height:200,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    input:{
      width:"90%",
      minHeight: isweb() == true? 200:100,
      marginTop: 12,
      backgroundColor: usecustomthemedcolor("userchat"),
      borderRadius: 8,
      justifyContent:"flex-start",
      textAlignVertical:"top",
      color: usecustomthemedcolor("text"),
    }
  });
  const router = useRouter()

  const warnmessage = () => {
    if (calculatedrisk < 20){
      return localization("risk1")
    }
    if (calculatedrisk <= 40){
      return(localization("risk2"))
    }
    if (calculatedrisk <= 60){
      return(localization("risk3"))
    }
    if (calculatedrisk <= 80){
      return(localization("risk4"))
    }
    if (calculatedrisk > 80){
      return(localization("risk5"))
    }
  }

  const illustration = () => {
    if (calculatedrisk < 20){
      return(require("@/assets/images/Risk1.svg"))
    }
    if (calculatedrisk <= 40){
      return(require("@/assets/images/Risk2.svg"))
    }
    if (calculatedrisk <= 60){
      return(require("@/assets/images/Risk3.svg"))
    }
    if (calculatedrisk <= 80){
      return(require("@/assets/images/Risk4.svg"))
    }
    if (calculatedrisk > 80){
      return(require("@/assets/images/Risk5.svg"))
    }
  };



  type sizewidthtype={
    width: number;
    height: number;
  };

  const visiblehandler=() => {
    if (hasdone === false){
      return(true)
    }if (hasdone === true){
      return(false)
    }else{
      return(false)
    }
  };
  
  

  const [isVisible, setisVisible] = useState<boolean>(visiblehandler())
  const [isRateusModalvisible, setrateusvisible] = useState<boolean>(false)

  const Pushbackui = () => {
    return(
      <Modal style={resultstyle.modal} visible={isVisible} transparent={true}>
        <ThemedView style={[resultstyle.modalbg,]}>
          <ThemedView ColorToUse='uiinner' style={resultstyle.modalchildren}>
            <ThemedText style={{fontSize:28, textAlign:"center"}}>กรุณาไปทำแบบฟอร์มก่อน!</ThemedText>
            <ThemedPressable style={{width:"80%", height:"33%", marginTop: 12, borderRadius: 8, justifyContent:"center", alignItems:"center"}} onPress={()=>onpress()}>
              <ThemedText style={{fontSize:28, textAlign: "center"}} type='bold'>กลับไปยังหน้าแบบฟอร์ม</ThemedText>
            </ThemedPressable>
          </ThemedView>
        </ThemedView>
      </Modal>
    )
  };

  const homepush = () =>{
    router.push({pathname:"/(Drawer)"})
    setrateusvisible(false)
  };

  const ratepush = () =>{
    router.push({pathname:"/Rate"})
    setrateusvisible(false)
  }

  const RateModal = () => {
    return(
      <Modal style={resultstyle.modal} visible={isRateusModalvisible} transparent={true} >
         <ThemedView style={[resultstyle.modalbg]}>
          <ThemedView ColorToUse='uiinner' style={[resultstyle.modalchildren,{height: "auto", width:isweb() == true? "60%":"80%"}]}>
           <ThemedText style={{fontSize:28, textAlign:"center"}}>{localization("rate")}</ThemedText>
           <ThemedText style={{fontSize:16, textAlign:"center"}}>Please provide your insight and comment on how could we made this app better!</ThemedText>
           <Pressable onPress={()=>ratepush()} style={resultstyle.returnnavbutton}>
              <ThemedText style={resultstyle.buttonfont}>{localization("takemethere")}</ThemedText>
            </Pressable>
           <Pressable onPress={()=>homepush()} style={resultstyle.returnnavbutton}>
              <ThemedText style={resultstyle.buttonfont}>{localization("Nothank")}</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </Modal>
    )
  };

  const onpress =()=>{
    router.push({pathname:"/Form"}) ,
    setisVisible(false)
  };

  return (
    <ScrollView style={resultstyle.Background}>
      <LinearGradient colors={gradient()} locations={[0, 0.5,1]} style={resultstyle.BgGradient}>
        <Image contentFit="scale-down" style={resultstyle.illustration} source={illustration()}></Image>
        <ThemedView ColorToUse={"innerresultUI"} style={resultstyle.innnerview} >
          <View style={[resultstyle.containerinnerstyle]} >
            <ThemedText type='bold' style={[resultstyle.headerfont,{marginBottom:isweb() == true? 12:8}]}>คุณมีความเสี่ยง</ThemedText>
            <View style={resultstyle.progressbarview}>
              <Progressbar percentfilled={calculatedrisk}></Progressbar>
              <ThemedText style={[resultstyle.headerfont,{marginLeft: isweb() == true? 24:14}]} type='bold'>{calculatedrisk}%</ThemedText>
            </View>
            <View style={[resultstyle.textcontainer]}>
              <ThemedText type='default' style={resultstyle.subheaderfont}>{warnmessage()}</ThemedText>
            </View>
            <Pressable onPress={()=>setrateusvisible(true)} style={resultstyle.returnnavbutton}>
              <ThemedText style={resultstyle.buttonfont}>{localization("returntohome")}</ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </LinearGradient>
      <RateModal></RateModal>
      <Pushbackui></Pushbackui>
    </ScrollView>
  )
}


export default result