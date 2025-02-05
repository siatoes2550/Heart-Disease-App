import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { currentwindowdimention } from '@/Hooks/DynamicElements'
import { ThemedText, ThemedView, usecustomthemedcolor, usethemedcolor } from '@/Hooks/ThemeManager'
import { isweb } from '@/Hooks/DynamicElements'

const Error = () => {
  return (
    <View style={Errorstylesheet.baseview}>
      <View style={Errorstylesheet.bgview}>
        <ThemedView style={Errorstylesheet.buttonview} ColorToUse='universalUI'>
          <ThemedText>This page doesnt exist</ThemedText>
        </ThemedView>
      </View>
    </View>
  )
}

const Errorstylesheet = StyleSheet.create({
  baseview:{
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
  bgview:{
    flex:1,
    backgroundColor: "#0a0b11c7",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonview:{
    width: (currentwindowdimention.width*90) /100,
    height: isweb() == true? 300:175,
    alignItems:"center",
    justifyContent: "center",
    borderRadius: isweb() == true? 12:8,
    borderColor: usecustomthemedcolor("text"),
    borderWidth: 2
  }
})

export default Error