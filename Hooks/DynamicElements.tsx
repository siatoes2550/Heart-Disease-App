import React, { useEffect } from "react";
import { Button, Dimensions, Text, useWindowDimensions } from "react-native";
import { Entypo, FontAwesome5, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { usecustomthemedcolor, usethemedcolor } from "./ThemeManager";
import {View} from "react-native"
import { router, useNavigation } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import { StackActions } from "@react-navigation/native";

// Get window Dimention
export const currentwindowdimention = Dimensions.get("window");

type iconprops = {
    iconfontfamily: string,
    icon: any,
    size?: number,
    colortouse?: "none"| "themed"
  }  

export function Useicon ({iconfontfamily, icon, size, colortouse = "themed", ...rest}:iconprops){
    const Iconfamily = (iconfontfamily:any) =>{
      if (iconfontfamily === "Entypo"){
        return (
          Entypo
        )
      }
      if (iconfontfamily === "FontAwesome5"){
        return(
          FontAwesome5
        )
      }
      if (iconfontfamily === "MaterialIcons"){
        return(
          MaterialIcons
        )
      }
      if (iconfontfamily === "FontAwesome"){
        return(
          FontAwesome
        )
      }
      if (iconfontfamily === "Ionicons"){
        return(
          Ionicons
        )
      }
      else {
        return(
          MaterialIcons
        )
        console.log({iconfontfamily})
      }
    }

    const IconFamilies = Iconfamily(iconfontfamily);
    const usecolor = ({colortouse}:iconprops) => {
      if (colortouse == "themed"){
        return(
          usecustomthemedcolor("text")
        )
      }
      else{
        return(
          "#fff"
        )
      }
    }
    return(
      <IconFamilies name={icon} size={size} color={usecolor(colortouse)} {...rest}/>
    )
}

export function Errorscreen(){
  try{
    router.push('/Error')
  }catch(error){
    console.log(error)
  }
};

export function dynamicsize(){
  const size = useWindowDimensions();
  const {height, width} = useWindowDimensions();
  return {height, width};
};

export function isweb(){
  const windowdimention = Dimensions.get("screen")
  const isweb = () => {
    if (windowdimention.width >= 1024 && windowdimention.height >= 768){
      return true
    }else{
      return false
    }
  }
  return isweb()
};