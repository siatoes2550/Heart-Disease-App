import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { Text, View, TextProps, ViewProps, Pressable, PressableProps, SwitchProps, StyleProp, ViewStyle, ScrollViewProps, Appearance, useColorScheme } from "react-native";
import { Colorscheme } from "@/Constant/Color";
import MaskedView, { MaskedViewProps } from "@react-native-masked-view/masked-view";


export const ThemeHandler = createContext("Light");

type currentColorscheme = "light"|"dark";

export function CurrentColorscheme(){
  const [theme,settheme] = useState(Appearance.getColorScheme())
  return theme ?? "light"
}


//Handle Theming
export function usethemedcolor(
  Colorname: keyof typeof Colorscheme.light | keyof typeof Colorscheme.dark | keyof typeof Colorscheme.generic,
  ThemedProps: { light: string; dark: string }
) {

  let Colorfromprops = ThemedProps[useColorScheme() || "light"];

  if (Colorfromprops) {
    return Colorfromprops;
  } else {
    const Lookupcolors = Colorscheme[useColorScheme() || "light"]?.[Colorname];
    if (Lookupcolors){
        return Lookupcolors;
    }
    else{
        const fallbackColor = Colorscheme.generic[Colorname];
        if (fallbackColor){
            return fallbackColor;
        }else{
            return "#fff"
        }
    }
  }
}
//Custom Themed Color

const customthemedcolor = () => {
  return (key) => Colorscheme[useColorScheme()|| "light"][key] || Colorscheme.light[key]
};

export const usecustomthemedcolor = customthemedcolor();

//Themed Text
type ThemedTextProps = TextProps & {
  lightcolor?: string;
  darkcolor?: string;
  type?: "default"| "semibold"| "bold"| "italic"| "italicsemibold"| "italicbold"| "link";
};

export function ThemedText({
  style,
  lightcolor = Colorscheme.light.text,
  darkcolor = Colorscheme.dark.text,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = usethemedcolor("text", { light: lightcolor, dark: darkcolor });
  let fontFamily = "RobotoCondensedRegular"
  if (type === "bold") {
    fontFamily = "RobotoCondensedBold"
  }else if ( type === "semibold"){
    fontFamily = "RobotoCondensedSemiBold"
  }
  return <Text style={[
    { color, fontFamily }, style,
  ]} 
  {...rest} />;
}
//Themed View
type ThemedViewProps = ViewProps & {
  ColorToUse?: ColorKeys;
};

type ColorKeys = keyof typeof Colorscheme.light & keyof typeof Colorscheme.dark;

export function ThemedView({ style, ColorToUse = "backgroundcolor", ...rest }: ThemedViewProps) {
  const backgroundColor = usethemedcolor(ColorToUse, {
    light: Colorscheme.light[ColorToUse],
    dark: Colorscheme.dark[ColorToUse],
  });
  return <View style={[{ backgroundColor }, style]} {...rest} />;
}

//Themed Masked View 

type ThemedMaskedViewProps = MaskedViewProps & {
  ColorToUse?: ColorKeys;
};

export function ThemedMaskedView({ style, ColorToUse = "backgroundcolor", ...rest }: ThemedMaskedViewProps) {
  const backgroundColor = usethemedcolor(ColorToUse, {
    light: Colorscheme.light[ColorToUse],
    dark: Colorscheme.dark[ColorToUse],
  });
  return <MaskedView style={[{ backgroundColor }, style]} {...rest} />;
}


//Themed Button 
type ThemedPressableProps = PressableProps & {
    Colortouse?: string;
    onPress?: () => void;
    colortolookup?: string;
    ColorToUse?: ColorKeys;
};

export function ThemedPressable({style, ColorToUse = "Pressable", onPress = () => {}, ...rest}:ThemedPressableProps){
  const backgroundColor = usethemedcolor(ColorToUse, {
    light: Colorscheme.light[ColorToUse],
    dark: Colorscheme.dark[ColorToUse],
  });
    return <Pressable style={[{ backgroundColor }, style] as StyleProp<ViewStyle>} onPress={onPress} {...rest}/>
}
