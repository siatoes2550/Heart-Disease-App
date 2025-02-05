import {StyleSheet, Pressable, View, TextInput, useColorScheme } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ThemedText, ThemedView, usecustomthemedcolor, usethemedcolor } from '@/Hooks/ThemeManager'
import Animated,{runOnJS, runOnRuntime, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import { MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { memo } from 'react'
import { types } from '@babel/core'
import { isweb } from '@/Hooks/DynamicElements'
import { agedatacollect, texteddiagnosis } from '@/Constant/DiagnosisList'
import { useFocusEffect } from 'expo-router'
import { Colorscheme } from '@/Constant/Color'
import { localization } from '@/Constant/Localization'

type nolines = {
  description:string,
  priority:number,
  parentindex: string
  returns: ({argumet, index}:argumet) => void,
  onselected: () => void,
};

type argumet ={
  argumet: string,
  index: string,
};

export const CircularSelector = (({description, priority, returns, parentindex, onselected}:nolines) => {
  const circularButtonStyle = StyleSheet.create({
    containerview:{
      width: "100%",
      height: "100%",
      flexDirection: "row",
      marginTop: 7,
      justifyContent: "center",
      alignContent: "center",
      alignItems:"center"
    },
    listview:{
      flex: 1,
      height:"50%",
      alignItems: "center",
      marginTop: 8
    },
    text:{
      textAlign: "center",
      fontSize:10,
      position: "static",
    },
    iconimg:{
      width: "80%",
      height: "80%",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    iconimgcontainer:{
      height: isweb() == true? 160:75,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      width: isweb() == true? "60%":undefined,
    },
    buttonimagepressable:{
      width:47.5,
      height:47.5,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
    }
  });

  let associatedriskfactor  = useSharedValue(0);
  let oldriskfactor = useSharedValue(0);
  let [heightfromsublines, updateheightfromsublines] = useState<number>(0);
  let [heightfromlines, updateheightfromlines] = useState<number>(0);
  let [containersize, updatecontainersize] = useState<number>(0);
  let hasselected = useSharedValue(false);

  useFocusEffect(
    React.useCallback(() => {
      selectedvalue.value = -1;
      hasselected.value = false;
    }, [])
  );
  
  const dynamicheightfromsubline = (sublinestext:number) => {
    updateheightfromsublines(sublinestext+3)
  };
  const dynamicheightfromtextline = (linestext:number) => {
    updateheightfromlines(linestext)
  };
  const dynamicheightfromcontainer = (containersize:number) => {
    updatecontainersize(containersize)
  };
  const dynamicheight = isweb() == true? (30 + containersize + heightfromlines + heightfromsublines):(25 + containersize + heightfromlines + heightfromsublines)

  type ratinglist = {
    priority: number,
    title?: string,
    imagesrc: any,
    riskfactor?: number,
  };

  const circulardata = [
    {
      priority: 0,
      title: "น้อยที่สุด",
      imagesrc: require("@/assets/images/Scale6.png")
    },
    {
      priority: 1,
      title: "น้อยมาก",
      imagesrc: require("@/assets/images/Scale5.png")
    },
    {
      priority: 2,
      title: "น้อย",
      imagesrc: require("@/assets/images/Scale4.png")
    },
    {
      priority: 3,
      title: "ปานกลาง",
      imagesrc: require("@/assets/images/Scale3.png")
    },
    {
      priority: 4,
      title: "มาก",
      imagesrc: require("@/assets/images/Scale2.png")
    },
    {
      priority: 5,
      title: "มากที่สุด",
      imagesrc: require("@/assets/images/Scale1.png")
    }
  ];

  const Animatedpressable = Animated.createAnimatedComponent(Pressable);
  const selectedvalue = useSharedValue<number>(-1);
  type handleonpress = {
    DisplayIndex: number,
    Riskfactor: number,
  };

  const ContaineranimateStyle = useAnimatedStyle(() => {
    const Size = selectedvalue.value === -1 ? "95%": "98%";
    if (isweb() == true){
      return {
        width: withSpring("100%"),
        height: withSpring(Size),
      };
    }else{
      return{
        width: withSpring(Size),
        height: withSpring(Size),
      }
    };
  });
  
  const Buttoncomponents = ((({priority,imagesrc}:ratinglist) =>{ 
    const width = useSharedValue(50);
    const height = useSharedValue(50);
    const handleonpress = (priority:number) => {
        if (selectedvalue.value !== priority) {
          selectedvalue.value = priority;
        };
      let returnstring = circulardata[priority].title;
      returns({argumet: returnstring, index: parentindex});
      if (hasselected.value == false){
        onselected();
        hasselected.value = true;
      }
    };

    const ButtonanimatedStyle = useAnimatedStyle(() => {
      const Size = selectedvalue.value === priority ? 80 : 50;
      if (isweb() == true){
        return {
          width: withSpring(Size*2.5),
          height: withSpring(Size*2.5),
        };
      }else{
        return{
          width: withSpring(Size),
          height: withSpring(Size),
        }
      };
    });

    return(
      <Animatedpressable style={[circularButtonStyle.buttonimagepressable,ButtonanimatedStyle]} onPress={()=>handleonpress(priority)}>
        <Image source={imagesrc} style={circularButtonStyle.iconimg}></Image>
      </Animatedpressable>
    )
  }));

  return (
    <ThemedView ColorToUse="uiinner" style={[{height: dynamicheight}, pickserstyle.containerstyle]}>
          <ThemedText onLayout={(event)=> dynamicheightfromtextline(event.nativeEvent.layout.height)} style = {[pickserstyle.SubheaderText,{alignSelf: "flex-start", marginBottom:4}]} type='semibold'>
            {description}
          </ThemedText>
          <ThemedView onLayout={(event)=>dynamicheightfromcontainer(event.nativeEvent.layout.height)} style={[circularButtonStyle.iconimgcontainer, ContaineranimateStyle]} ColorToUse="ui2">
            {circulardata.map((circulardata)=>{
              return(
                <Buttoncomponents key={circulardata.priority} priority={circulardata.priority} imagesrc={circulardata.imagesrc}></Buttoncomponents>
              )
            })}
          </ThemedView>
    </ThemedView>
  )
});

export const Textcontentselector =({option, isage=false, objkey, title, Subdescription, Renderpriority, onriskfactorchange, onhasselected, accumulateddata, handleonpressout}:contentselector)=>{
  let [associatedriskfactor, setassociatedriskfactor] = useState<number>(0)
  let [oldriskfactor, setoldriskfactor] = useState<number>(0)
  const radioselector = StyleSheet.create({
    selectioncontainer:{
      borderRadius:4,
      flexDirection: "row",
      justifyContent: "flex-start",
      width: isweb() == true? "97.5%":"90%",
      alignItems: "center",
      marginTop:8
    },
    selectortext:{
      marginLeft: 6,
      fontSize: isweb() == true? 22:12,
      width: isweb() == true? "95%":"85%",
      height: "auto",
    },
    iconstyle:{
      marginLeft:8
    },
  });

  let hasselected = useSharedValue(false)

  type handleonpress = {
    DisplayIndex: number,
    Riskfactor: number,
  };
  
  useFocusEffect(
    React.useCallback(() => {
      setselectedID(-1);
      hasselected.value = false;
    }, [])
  );


  const handleonpress = ({DisplayIndex, Riskfactor}:handleonpress) =>{
    const oldriskfactorhandle = oldriskfactor
    const associatedriskfactorhandle = associatedriskfactor
    let calculatedfactor = (Riskfactor - oldriskfactor)
    calculatedfactor.toFixed(3);
    let choice = Object.values(isage == true? agedatacollect:texteddiagnosis)[Renderpriority - 1].Option[DisplayIndex - 1].Description
    accumulateddata = calculatedfactor
    if (selectedID !== DisplayIndex){
      setselectedID(DisplayIndex);
      setassociatedriskfactor(Riskfactor - oldriskfactor);
      setoldriskfactor(Riskfactor);
      onriskfactorchange(calculatedfactor);
      handleonpressout({argumet: choice, index: objkey})
      if (hasselected.value == false){
        hasselected.value = true
        onhasselected()
      }
    };

  };
  let [selectedID, setselectedID] = useState<number>()
  return(
    <ThemedView  ColorToUse='uiinner' style={pickserstyle.maincontainer}>
      <View style={[pickserstyle.containerstyle,{height:"auto"}]}>
          <ThemedText style = {[pickserstyle.HeaderText,{alignSelf: "flex-start"}]} type='semibold'>{title}</ThemedText>
          <ThemedText type="semibold" style={[pickserstyle.SubheaderText,{alignSelf:"flex-start"}]}>{Subdescription}</ThemedText>
          {option.map((option):any=>{
            return(
              <Pressable style={[radioselector.selectioncontainer,{backgroundColor: selectedID===option.displayindex? usecustomthemedcolor("selectorinactive"):usecustomthemedcolor("selectoractive")}]} key={`${Renderpriority}${option.displayindex}`} onPress={()=>handleonpress({Riskfactor:option.riskfactor, DisplayIndex: option.displayindex})}>
                <MaterialIcons name={selectedID===option.displayindex? "radio-button-checked":"radio-button-unchecked"} style={[radioselector.iconstyle]} size={24} color={usecustomthemedcolor("text")}/>
                <View style={{paddingVertical: isweb() == true? 20:12, width:"100%"}} >
                  <ThemedText style={radioselector.selectortext}>{option.description}</ThemedText>
                </View>
              </Pressable>
            )
          })}
      </View>  
    </ThemedView>
  )
};


export const BMIcalculator = ({onupdate, handleonpressout, onhasfilled}:calc) => {
  const [risk, setrisk] = useState(0)
  const calculatorstyle = StyleSheet.create({
    containerstyle: {
      width: "97.5%",
      borderRadius: 12, 
      alignItems: "flex-start",
      marginBottom: 10,
    },
    maincontainer:{
      paddingVertical: isweb() == true? 12:5,
      height:"auto",
      width:"97.5%",
      marginBottom:10,
      borderRadius: 12,
      alignItems: "center"
    },
    imput:{
      color: usecustomthemedcolor("text"),
      height: isweb() == true? 40:30,
      padding: isweb() == true? 8:4,
      width: "100%",
      borderRadius: 5,
      marginTop:2,
      borderColor: usecustomthemedcolor("text"),
      backgroundColor: usecustomthemedcolor("progressbar"),
      borderWidth: useColorScheme()==="dark"? 3:0,
    },
    headertext:{
      fontSize: isweb() == true? 44:22,
    },
    subheadertext:{
      fontSize: isweb() == true? 28:12,
    }
  });
  const [height, setheight] = useState(0);
  const [weight, setweight] = useState<number>(0);

  let [bmi, setbmi] = useState(NaN);
  let [filled, setfilled] = useState(false);
  let [oldriskfactor, setoldriskfactor] = useState<number>(0)

  let calculatedRisk = 0;
  const calculateBMI = () => {
    const heightwithcm = height / 100;
    const getbmi = weight / Math.pow(heightwithcm, 2);
    setbmi(getbmi);
    
    if (getbmi < 18.5) {
      calculatedRisk = 0.1
    } else if (getbmi >= 18.5 && bmi <= 22.9) {
      calculatedRisk = 0.2
    } else if (getbmi > 22.9 && bmi <= 24.9) {
      calculatedRisk = 0.4
    } else if (getbmi > 24.9 && bmi <= 29.9) {
      calculatedRisk = 0.8
    } else {
      calculatedRisk = 1
      console.log(getbmi)
    }
    onupdate(calculatedRisk  - oldriskfactor);
    setoldriskfactor(calculatedRisk);
  };

  useEffect(() => {
    if (!isNaN(bmi) && filled == false && isFinite(bmi)){
      onhasfilled()
      setfilled(true)
    };
    handleonpressout({ argumet: bmi.toString(), index: "BMI" });
  }, [bmi])

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  useFocusEffect(
    React.useCallback(() => {
      setweight(0);
      setheight(0);
      setfilled(false);
      setheightsext('');
      setwidthtext('');
    }, [])
  );

  const [weightext, setwidthtext] = useState('');
  const [heightext, setheightsext] = useState('');
  const [warnactive, setwarnactive] = useState(false);

  type OnChanged = {
    argument: string,
    type: "weight"|"height",
  }
  function OnChanged({argument, type}:OnChanged) {
    const numericText = (argument.replace(/[^0-9]/g, ''))
    if (type == "height"){
      setheightsext(numericText)
    }if(type == "weight"){
      setwidthtext(numericText)
    };
  };

  function updateHeight(argument: string) {
    const numericHeight = parseFloat(argument);
    OnChanged({ argument: argument, type: "height" });
    setheight(numericHeight)
  }

  function updateWeight(argument: string) {
    const numericWeight = parseFloat(argument);
    OnChanged({ argument: argument, type: "weight" });
    setweight(numericWeight)
  };

  const Warnmessage =() => {
    return(
      <View style={{width:"100%", flexDirection:"row", marginTop: 10, alignItems:"center"}}>
        <View style={{width:10, height: 40, backgroundColor: Colorscheme.generic.Redbutton}}></View>
        <ThemedText style={{marginLeft: 12, fontSize: 18, fontFamily:"RobotoCondensedSemibold"}}>{localization("numonly")}</ThemedText>
      </View>
    )
  }

  return(
    <ThemedView ColorToUse='uiinner' style={calculatorstyle.maincontainer}>
      <View style={[calculatorstyle.containerstyle,{height:"auto"}]}>
        <ThemedText style={calculatorstyle.headertext}>BMI</ThemedText>
        <View style={{width:"100%"}}>
          <ThemedText style={calculatorstyle.subheadertext}>ใส่น้ำหนักของท่าน(kg)</ThemedText>
          <TextInput keyboardType='number-pad' style ={calculatorstyle.imput} maxLength={3} value={weightext} onChangeText={weight => updateWeight(weight)}></TextInput>
          <ThemedText style={calculatorstyle.subheadertext}>ใส่ส่วนสูงของท่าน(cm)</ThemedText>
          <TextInput style ={calculatorstyle.imput} value={heightext} maxLength={3} keyboardType='number-pad' onChangeText={height => updateHeight(height)}></TextInput>
          <Warnmessage></Warnmessage>
        </View>
      </View>
    </ThemedView>
  )
};

type calc = {
  onupdate: (risk: number) => void,
  onhasfilled: () => void,
  handleonpressout: ({argumet, index}:argumet) => void,
};

type contentselector = {
  option: any,
  title: string,
  Subdescription: string,
  onriskfactorchange: (riskFactor: number) => void;
  onhasselected: () => void,
  accumulateddata?: number,
  handleonpressout:({argumet, index}:argumet) => void,
  Renderpriority: number,
  objkey: string,
  isage?: boolean,
}


const pickserstyle = StyleSheet.create({
  containerstyle: {
    width: "100%",
    borderRadius: 12, 
    alignItems: "center",
    marginBottom: 10
  },
  maincontainer:{
    paddingVertical: isweb() == true? 12:5,
    height:"auto",
    width:"97.5%",
    marginBottom:10,
    borderRadius: 12,
  },
  HeaderText:{
   fontSize: isweb() == true? 44:22,
   marginLeft: 13,
  },
  SubheaderText: {
   fontSize: isweb() == true? 28:12,
   marginLeft: 14,
   marginTop: 3,
  },
})

type CircularSelector = {
  ordernumber: number
  title: string
}