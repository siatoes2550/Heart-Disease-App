import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { isweb } from '@/Hooks/DynamicElements';
import { ThemedMaskedView, ThemedText, ThemedView, usecustomthemedcolor, usethemedcolor } from '@/Hooks/ThemeManager';

type total = {
  percentfilled: number,
  width?: number;
  height?: number;
}
const Progressbar = ({percentfilled, width, height}:total) => {
  let colortouse:string;

  if (percentfilled <20){
    colortouse = "#4987e6"
  }else if (percentfilled <40){
    colortouse = "#8de462"
  }
  else if (percentfilled < 60){
    colortouse = "#fada97"
  }
  else if (percentfilled < 80){
    colortouse = "#ea9467"
  }
  else if (percentfilled> 80){
    colortouse = "#f72e2e"
  }
  else{
    colortouse = "#7c3da7"
  };


  const progressstyle = StyleSheet.create({
    progresscontainer:{
      width: width?? isweb() == true? "80%":"85%",
      height: height?? isweb() == true? 50:30,
      borderRadius: 8,
      borderColor: usecustomthemedcolor("text"),
      backgroundColor: usecustomthemedcolor("progressbar"),
      borderWidth: useColorScheme()==="dark"? 3:0,
    },
    innerprogresscontainer:{
      width: "100%",
      height:"100%",
      padding: 3,
    },
    progressbar:{
      width: `${percentfilled}%`,
      height: "100%",
      backgroundColor: colortouse,
      borderRadius: 5,
    },
  });

  return (
    <ThemedView ColorToUse='ui3' style={progressstyle.progresscontainer}>
      <View style={progressstyle.innerprogresscontainer}>
        <ThemedView style={progressstyle.progressbar}></ThemedView>
      </View>
    </ThemedView>
  )
}

export default Progressbar