import { Modal, StyleSheet, useWindowDimensions, View } from 'react-native'
import React,{createContext, useContext, useEffect, useState} from 'react'
import { BMIcalculator, CircularSelector, Textcontentselector } from '@/Components/Selector'
import { ThemedPressable, ThemedText, ThemedView, usecustomthemedcolor } from '@/Hooks/ThemeManager'
import { agedatacollect, getmaximumrisk, texteddiagnosis } from '@/Constant/DiagnosisList'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect, useRouter } from 'expo-router'
import { accumulatedriskcontext, handleformcontext, senddatacontext } from '@/Hooks/ContextProvider'
import { FadeIn, useSharedValue } from 'react-native-reanimated'
import { isweb } from '@/Hooks/DynamicElements'
import { Colorscheme } from '@/Constant/Color'
import { dataserverlink, sendData } from '@/Hooks/Datamanager'

const Form = () => {
  const formstyle = StyleSheet.create({
    Background:{
      flex:1,
      backgroundColor: usecustomthemedcolor("backgroundcolor")
    },
    Pressing:{
      width:200,
      height:50,
      borderRadius:8,
      marginBottom:12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    Text:{
      textAlign: "center",
      fontSize:20
    },
    Popupmodal:{
      position: "absolute",
      bottom: isweb() == true? "37.5%":"40%",
      borderRadius: isweb() == true? 7:8,
      height: isweb() == true? "25%":"20%",
      width: isweb() == true? "60%":"70%",
      left: isweb() == true? "20%":"15%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: isweb() == true? 7:3,
      borderColor:  Colorscheme.dark.text,
    },
    Textinner:{
      fontSize: isweb() == true? 28:12,
      textAlign: "center",
    },
    pressablemodal:{
      width: isweb() == true? "60%":"75%",
      height: isweb() == true? 80:40,
      marginTop: isweb() == true? 12:22,
      borderRadius: isweb() == true? 8:6,
      alignItems: "center",
      justifyContent: 'center',
    }
  });

  const {optinsenddata} = useContext(senddatacontext)
  const router = useRouter();
  const formaccumulatedrisk = useSharedValue<number>(0);
  const { setAccumulatedrisk, accumulatedrisk } = useContext(accumulatedriskcontext);
  const { hasdone, sethasdone  } = useContext(handleformcontext);
  const handleriskchange = (newaccumulation: number) => setAccumulatedrisk(newaccumulation);
  const handleformchange = (argument: boolean) => sethasdone(argument);
  const totalselected = useSharedValue(0);
  let maxpossibleanswer = getmaximumrisk() + 2;

  function updatetotalhasselected(){
    totalselected.value = (totalselected.value + 1)
    console.log(totalselected.value)
  }
  
  const changehandler = (RiskFactor:number) => {
    const newaccumulation = parseFloat((formaccumulatedrisk.value + RiskFactor).toFixed(3));
    formaccumulatedrisk.value=(newaccumulation);
    console.log(formaccumulatedrisk.value)
  };

  type splice = {
    argumet: string,
    index: string,
  }

  const splices = ({argumet, index}: splice) => {
    data[index] = argumet
  };

  const calculate = () => {
    if (totalselected.value == maxpossibleanswer){
      handleriskchange(formaccumulatedrisk.value);
      router.push({pathname:"/result"});
      handleformchange(true);
      if (optinsenddata == true){
        sendData({arg: data})
        console.log(data)
      }
    }else{
      setisVisible(true)
    }
  };

  const [data, setData] = useState<any>({});
  let createdkey = false

  const createdata = () => {
    if (createdkey == false){
      for (let key in texteddiagnosis) {
        data[key] = undefined;
      };
      createdkey = true;
    }
  };

  useEffect(()=>{
    createdata();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      totalselected.value = 0;
      for (let key in data) {
        data[key] = undefined;
      };
    }, [])
  );

  const [isVisible, setisVisible] = useState<boolean>(false)
  const Modalnotif = () => {
    return(
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <ThemedView ColorToUse='uiinner' style={formstyle.Popupmodal}>
          <ThemedText type='bold' style={formstyle.Textinner}>กรุณาเลือกคำตอบให้หมด!</ThemedText>
          <ThemedPressable ColorToUse='topbar2' onPress={()=>setisVisible(false)} style={formstyle.pressablemodal}>
            <ThemedText type='bold' style={formstyle.Textinner}>เข้าใจแล้ว</ThemedText>
          </ThemedPressable>
        </ThemedView>
      </Modal>
    )
  };

  return (
      <ScrollView style={formstyle.Background} contentContainerStyle={{alignItems: "center"}}>
        <View style={{height: isweb() == true? 20:5}}></View>
        {ageinfo.map((diagnosis) => {
          return(
            <Textcontentselector objkey={diagnosis.objkey} isage={true} onhasselected = {updatetotalhasselected} onriskfactorchange={changehandler} option={diagnosis.option} title={diagnosis.description} Subdescription={diagnosis.Subdescription} Renderpriority={diagnosis.Renderpriority} key={`ALT${diagnosis.Renderpriority}`} handleonpressout={splices}>
            </Textcontentselector>
          )
        })}
        <BMIcalculator onupdate={changehandler} onhasfilled={updatetotalhasselected} handleonpressout={splices}></BMIcalculator>
        {datainfo.map((diagnosis) => {
          return(
            <Textcontentselector objkey={diagnosis.objkey} onhasselected = {updatetotalhasselected} onriskfactorchange={changehandler} option={diagnosis.option} title={diagnosis.description} Subdescription={diagnosis.Subdescription} Renderpriority={diagnosis.Renderpriority} key={`${diagnosis.Renderpriority}`} handleonpressout={splices}>
            </Textcontentselector>
          )
        })}]
        <ThemedPressable ColorToUse={"topbar2"} style={formstyle.Pressing} onPress={()=>calculate()}>
          <ThemedText type="semibold" style={formstyle.Text}>คำนวนเลย!</ThemedText>
        </ThemedPressable>
        <Modalnotif></Modalnotif>
     </ScrollView> 
     
  )
}

type optiondiag = {
  description: string;
  displayindex: number;
  riskfactor: number;
};

type optiondiagbutton = {
  level: number;
  riskfactor: number;
};

type diagnosistype = {
  description: string;
  Renderpriority: number;
  option: optiondiag[];
  Subdescription: string;
  objkey:string;
};

type buttondiagnosistype = {
  description: string;
  Renderpriority: number;
  option: optiondiagbutton[];
  Subdescription: string;
  objkey:string;
};


const datainfo: diagnosistype[] = Object.entries(texteddiagnosis).map(
  ([key, value]) => ({
    description: value.Description,
    Renderpriority: value.RenderPriority,
    Subdescription: value.Subdescription,
    objkey: key,
    option: Object.entries(value.Option).map(([key, value]) => ({
      riskfactor: value.Riskfactor,
      displayindex: value.DisplayIndex,
      description: value.Description,
      key: value.DisplayIndex
    })),
  })
);

const ageinfo: diagnosistype[] = Object.entries(agedatacollect).map(
  ([key, value]) => ({
    description: value.Description,
    Renderpriority: value.RenderPriority,
    Subdescription: value.Subdescription,
    objkey: key,
    option: Object.entries(value.Option).map(([key, value]) => ({
      riskfactor: value.Riskfactor,
      displayindex: value.DisplayIndex,
      description: value.Description,
      key: value.DisplayIndex
    })),
  })
);

export default Form