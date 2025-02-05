import { localization } from "@/Constant/Localization";
import { StackActions } from "@react-navigation/native";
import { getLocales, Localization, useLocales } from "expo-localization";
import { useNavigation } from "expo-router";
import React,{createContext, useContext, useEffect, useState} from "react";

export const accumulatedriskcontext = createContext({
    accumulatedrisk:0,
    setAccumulatedrisk:(risk:number) => {},
  });

export const handleformcontext = createContext({
    hasdone:false ,
    sethasdone:(argument:boolean) => {},
  });

export const themecontext = createContext({
  theme:"auto" ,
  settheme:(argument:string) => {},
});

export const langcontext = createContext({
  language: "th",
  setpreferedlanguage:(argument:string) => {},
});

export const senddatacontext = createContext({
  optinsenddata: true,
  setdataopsin:(argument:boolean) => {},
});

export const Globalappcontext = ({ children }:any) => {
  const locallangugae = getLocales()[0].languageCode || "th"
  const [accumulatedrisk, setAccumulatedrisk] = useState<number>(0);
  const [hasdone, sethasdone] = useState<boolean>(false);
  const [optinsenddata, setdataopsin] = useState<boolean>(true);
  const [language, setpreferedlanguage] = useState<string>(locallangugae);
  const [theme, settheme] = useState<string>("Auto")

  return(
    <accumulatedriskcontext.Provider value={{accumulatedrisk, setAccumulatedrisk}}>
      <handleformcontext.Provider value={{hasdone, sethasdone}}>
        <themecontext.Provider value={{theme, settheme}}>
          <langcontext.Provider value={{language, setpreferedlanguage}}>
            <senddatacontext.Provider value={{optinsenddata, setdataopsin}}>
               {children}
            </senddatacontext.Provider>
          </langcontext.Provider>
        </themecontext.Provider>
      </handleformcontext.Provider>
    </accumulatedriskcontext.Provider>
  )
};

