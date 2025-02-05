import { View, Text, Modal, StyleSheet, Switch } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemedPressable, ThemedText, ThemedView, usecustomthemedcolor } from '@/Hooks/ThemeManager';
import { localization } from '@/Constant/Localization';
import { langcontext } from '@/Hooks/ContextProvider';
import { isweb } from '@/Hooks/DynamicElements';

type isVisible = {
  isVisible: boolean;
  onclose: () => void;
  onactive?: () => void;
}
export const Settingmodal = ({isVisible = false, onclose}:isVisible) => {
  const {setpreferedlanguage, language} = useContext(langcontext)
  const [isenabled, Setisenabled] = useState<boolean>(language === "en"? true:false);
  const changelang = () => {
    Setisenabled (previousstate=> !previousstate)
    if (isenabled == true){
      setpreferedlanguage("th")
    }else{
      setpreferedlanguage("en")
    }
  };
  const widthforslide =()=> {
    if (language == "th"){
      return "40%"
    }else{
      return "22.5%"
    }
  }
  return (
    <Modal visible = {isVisible} transparent={true} animationType={"slide"}>
      <View style={modalstylesheet.Modal}>
        <ThemedView ColorToUse='uiinner' style={modalstylesheet.SettingModalContainer}>
          <ThemedText style={modalstylesheet.title} type='bold'>
            {localization("setting")}
          </ThemedText>
          <ThemedView style={modalstylesheet.saperator} ColorToUse='text'></ThemedView>
          <View style={modalstylesheet.innercontainer}>
            <View style={modalstylesheet.itemcontainer}>
              <View style={modalstylesheet.textcontainer}>
                <ThemedText style={modalstylesheet.textinside}>{localization("ChangeLang")}</ThemedText>
              </View>
              <Switch trackColor= {{false: usecustomthemedcolor("inactivetrackcolor"), true:usecustomthemedcolor("activetrackcolor")}} thumbColor={isenabled ? usecustomthemedcolor("activethumbcolor") : usecustomthemedcolor("inactivethumbcolor")} value = {isenabled} onValueChange={changelang}></Switch>
            </View>
          </View>
          <ThemedPressable style={modalstylesheet.exis} onPress={()=> onclose()}>
            <ThemedText>{localization("Close")}</ThemedText>
          </ThemedPressable>
        </ThemedView>
      </View>
    </Modal>
  )
}

export const AboutModal = ({isVisible = false, onclose}:isVisible) => {
    return(
      <Modal visible = {isVisible} transparent={true} animationType={"slide"}>
      <View style={modalstylesheet.Modal}>
        <ThemedView ColorToUse='uiinner' style={modalstylesheet.SettingModalContainer}>
          <ThemedText style={modalstylesheet.title} type='bold'>
            {localization("about")}
          </ThemedText>
          <ThemedView style={modalstylesheet.saperator} ColorToUse='text'></ThemedView>
            <View style={modalstylesheet.textcontainer2}>
             <ThemedText style={modalstylesheet.textinside2}>
              {localization("aboutdescription")}
             </ThemedText>
            </View>
          <ThemedPressable style={modalstylesheet.exis} onPress={()=> onclose()}>
            <ThemedText>{localization("Close")}</ThemedText>
          </ThemedPressable>
        </ThemedView>
      </View>
    </Modal>
    )
}

const modalstylesheet = StyleSheet.create({
  Modal:{
    alignItems:"center",
    justifyContent: "center",
    flex:1
  },
  SettingModalContainer:{
    width: isweb() == true? 400:"80%",
    height: isweb() == true? 300: 175,
    borderRadius: isweb() == true? 20: 8,
    padding: 12,
    alignItems:"center"
  },
  title:{
    fontSize: isweb() == true? 48:16,
    fontFamily: "RobotoCondensedSemiBold",
    marginLeft: 8,
    alignSelf: "center",
    
  },
  innercontainer:{
    padding: 8,
    height: "40%",
    width:"100%",
    marginTop: isweb() == true? 10:0,
  },
  itemcontainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems: "center",
    width:"100%"
  },
  exis:{
    width: "80%",
    height: isweb() == true? "20%": 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6
  },
  textcontainer:{
    width: isweb() == true? "80%":"60%",
    alignItems:"flex-start",
    justifyContent:"center",
  },
  textinside:{
    fontSize: isweb() == true? 26:13
  },
  saperator:{
    height:2,
    marginTop: isweb() == true? 12:2,
    width:"80%"
  },
  textcontainer2:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    height:"50%",
    width:"75%"
  },
  textinside2:{
    fontSize: isweb() == true? 18:10,
    textAlign: "center"
  },
})