import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React,{useState} from "react";
import { useEffect } from "react";
import { setStatusBarBackgroundColor, setStatusBarStyle} from "expo-status-bar";
import { CurrentColorscheme } from "@/Hooks/ThemeManager";
import { Colorscheme } from "@/Constant/Color";
import { Globalappcontext } from "@/Hooks/ContextProvider";
import { currentwindowdimention } from "@/Hooks/DynamicElements";
import { getLocales } from "expo-localization";
import { useColorScheme } from "react-native";
 

SplashScreen.preventAutoHideAsync()


export default function RootLayout() {
  const [loaded, error] = useFonts({
    //ENGLISH
    'RobotoCondensedRegular': require("@/assets/fonts/RobotoCondensed-Regular.ttf"),
    'RobotoCondensedItalic': require('@/assets/fonts/RobotoCondensed-Italic.ttf'),
    'RobotoCondensedSemiBold': require('@/assets/fonts/RobotoCondensed-SemiBold.ttf'),
    'RobotoCondensedSemiBoldItalic': require('@/assets/fonts/RobotoCondensed-SemiBoldItalic.ttf'),
    'RobotoCondensedBoldItalic': require('@/assets/fonts/RobotoCondensed-BoldItalic.ttf'),
    'RobotoCondensedBold' : require('@/assets/fonts/RobotoCondensed-Bold.ttf'),
  });
  const currentcolorscheme = useColorScheme()
  
  useEffect(() => {
    if (currentcolorscheme==="dark"){
      setStatusBarStyle("light")
      setStatusBarBackgroundColor(Colorscheme.dark.statusbar)
    }
    else{
      setStatusBarStyle("dark")
      setStatusBarBackgroundColor(Colorscheme.light.backgroundcolor)
    }
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  };

  

  ////////////////////////
  

  return(
    <Globalappcontext>
        <Stack>
          <Stack.Screen name ="(Drawer)" options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name = "Error" options={{presentation: "transparentModal", headerShown: false}} ></Stack.Screen>
        </Stack> 
    </Globalappcontext>
  )
}
