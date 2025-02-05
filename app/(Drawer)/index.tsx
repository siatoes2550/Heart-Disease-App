import React, { useContext, useEffect, useState } from "react";
import { ThemedView, ThemedText, usecustomthemedcolor } from "@/Hooks/ThemeManager";
import { Pressable, StyleSheet, View, Text, FlatList, useWindowDimensions, Modal, Settings,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { isweb } from "@/Hooks/DynamicElements";
import { Link, useNavigation, useRouter } from "expo-router";
import { DrawerActions, StackActions } from "@react-navigation/native";
import { currentwindowdimention, Errorscreen, Useicon } from "@/Hooks/DynamicElements";
import { langcontext, senddatacontext } from "@/Hooks/ContextProvider";
import { AboutModal, Settingmodal } from "@/Components/Modalcomponent";
import { localization } from "@/Constant/Localization";

const index = () => {
  type itemlist = {
    title: string;
    icon: string;
    iconfontfamily: string;
    gradientcolor1: string;
    gradientcolor2: string;
    WidthScale?: number;
    HeightScale?: number;
    key?: number;
    saperator?: boolean;
    hiddenonweb?: boolean;
    action?: () => void;
  };
  
  const router = useRouter()
  const action = {
    Settings: 
      () => {setsettingvisible(true)},
    About:
      () => {setaboutvisible(true)},
    Helper:
      () => {
        router.push('/Helper')
      }
  };

  const homelistview: itemlist[] = [
    {
      title: localization("helper"),
      icon: "chat",
      iconfontfamily: "Entypo",
      gradientcolor1: "#dc2ddc",
      gradientcolor2: "#a630fa",
      key: 1,
      WidthScale: 2,
      action: action.Helper
    },
    {
      title: localization("setting"),
      icon: "settings",
      iconfontfamily: "MaterialIcons",
      gradientcolor1: "#2875e7",
      gradientcolor2: "#0e41a8",
      key: 2,
      action: action.Settings
    },
    {
      title: "Saperator1",
      icon: "none",
      iconfontfamily: "FontAwesome6",
      gradientcolor1: "#a935b9",
      gradientcolor2: "#bc3ae4",
      key: 3,
      saperator: true,
    },
    {
      title: localization("about"),
      icon: "info",
      iconfontfamily: "FontAwesome5",
      gradientcolor1: "#23792a",
      gradientcolor2: "#11a80e",
      key: 4,
      action: action.About
    },
    {
      title: "Submitted data",
      icon: "send-o",
      iconfontfamily: "FontAwesome",
      gradientcolor1: "#ff2e2e",
      gradientcolor2: "#ff5b02",
      key: 5,
      hiddenonweb: true,
      WidthScale: 2,
      HeightScale: 0.8,
    }
  ];

  const indexstyle = StyleSheet.create({
    backgroundcolor: {
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    topbar: {
      width: "95%",
      height: isweb() == true ? "42.5%" : "25%",
      marginTop: isweb() == true ? 22 : 6,
    },
    gradient: {
      width: "100%",
      height: "100%",
      borderRadius: isweb() == true ? 12 : 8,
    },
    Innerhiddentopbar: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: isweb() == true ? 6 : 4,
      flexDirection: "row",
    },
    imagecontainertop: {
      width: "60%",
      height: "65%",
    },
    imagetop: {
      width: "100%",
      height: "100%",
    },
    textcontainertop: {
      width: "40%",
      height: "100%",
    },
    texttop: {
      marginTop: isweb() == true ? 52 : 16,
      fontSize: isweb() == true ? 64 : 14,
      marginLeft: isweb() == true ? 24 : 12,
      color: "#fff",
    },
    textbottom: {
      marginTop: 3,
      fontSize: isweb() == true ? 48 : 13,
      marginLeft: isweb() == true ? 26 : 13,
      color: "#fff",
    },
    saperator: {
      height: 4,
      marginTop: isweb() == true ? 16 : 12,
      width: "75%",
      borderRadius: 2,
    },
    drawerheadermenu: {
      height: "5%",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      marginRight: 12,
      marginTop: 6,
      flexDirection: "row",
    },
    listview: {
      width: "100%",
      height: isweb() == true ? "50%" : "auto",
      marginTop: 6,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    modal: {
      width: "60%",
      height: "33%",
      backgroundColor: "green"
    }
  });

  
  const navigator = useNavigation();
  const [issettingvisible, setsettingvisible] = useState(false)
  const [isaboutvisible, setaboutvisible] = useState(false)


  const Rendererthingy = ({title,icon,iconfontfamily,gradientcolor1,gradientcolor2,WidthScale = 1,HeightScale = 1,saperator = false, hiddenonweb = false, action = () => {}}: itemlist) => {
    const size = {height: isweb() == true ? 150 : 100, width:isweb() == true? Math.round(currentwindowdimention.width * 47.5) / 100: Math.round(currentwindowdimention.width * 40)/ 100};
    const saperatorwidth = isweb() == true? 10:7.5;
    const renderstyle = StyleSheet.create({
      listitems: {
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        paddingRight: 2,
      },
      UnderlineText: {
        textAlign: "right",
        fontSize: isweb() == true ? 42 : 16,
        marginLeft: isweb() == true ? 32 : 0,
      },
      gradient2: {
        width: "100%",
        height: "100%",
        borderRadius: isweb() == true ? 12 : 8,
        alignContent: "flex-start",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flexDirection: "row",
      },
      inner: {
        height: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
      },
      innerwidth1: {
        height: "60%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
      },
      GradientMobileWidth1: {
        width: "100%",
        height: "100%",
        borderRadius: isweb() == true ? 12 : 8,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      },
      innerner: {
        justifyContent: "center",
      },
      saperator: {
        width: saperatorwidth,
        height: "100%",
      },
      underdataview: {
        width: "20%",
        height: "100%"
      }
    });

    ////////////////////////////////////////////////////

    const innerareashare = () => {
      if (WidthScale == 1 && isweb() == true) {
        return "82.5%";
      }
      if (WidthScale == 2 && isweb() == true) {
        return "90%";
      }
      if (WidthScale == 1 && isweb() == true) {
        return "45%";
      }
      if (WidthScale == 2 && isweb() == true) {
        return "40%";
      }
    };

    const innerareaoffset = () => {
      if (isweb() == true) {
        return 28;
      }
      if (WidthScale == 1) {
        return 0;
      }
      if (WidthScale == 2) {
        return 28;
      }
    };

    const Widthwrap = () => {
      if (WidthScale == 2) {
        return size.width * WidthScale ;
      }
      if (WidthScale == 1 ) {
        return size.width * WidthScale - saperatorwidth/2;
      }
      else{
        return 20
      }
    };

    if (saperator == true) {
      return <View style={renderstyle.saperator}></View>;
    }

    const Marginbottom = () => {
      if (isweb() == true) {
        return 16;
      }
      if (WidthScale == 1) {
        return 2;
      }
      if (WidthScale == 2) {
        return 6;
      }
    };

    if (isweb() == true && hiddenonweb == false) {
      return (
        <Pressable style={[ renderstyle.listitems, { width: Widthwrap() , height: size.height * HeightScale }]} onPress={action}>
          <LinearGradient style={[renderstyle.gradient2]} colors={[gradientcolor1, gradientcolor2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <View style={renderstyle.inner}>
              <View style={[renderstyle.innerner, { marginLeft: innerareaoffset() }]}>
                <Useicon icon={icon} iconfontfamily={iconfontfamily} size={84} colortouse="none" ></Useicon>
              </View>
            </View>
            <Text style={[ renderstyle.UnderlineText,{marginBottom: Marginbottom(), color: "#fff", fontFamily: "RobotoCondensedSemiBold",}]}> {title} </Text>
          </LinearGradient>
        </Pressable>
      );
    } if (hiddenonweb == true){
      return (
        <View></View>
      )
    }
    else {
      if (WidthScale == 1) {
        return (
          <Pressable style={[ renderstyle.listitems, { width: Widthwrap(), height: size.height * HeightScale + 20 }]} onPress={action}>
            <LinearGradient style={renderstyle.GradientMobileWidth1} colors={[gradientcolor1, gradientcolor2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
              <View style={[renderstyle.innerwidth1, { width: "100%" }]}>
                <Useicon icon={icon} iconfontfamily={iconfontfamily} size={48}></Useicon>
              </View>
              <Text style={[ renderstyle.UnderlineText, {marginBottom: Marginbottom(),color: "#fff",fontFamily: "RobotoCondensedSemiBold",}]}>
                {title}
              </Text>
            </LinearGradient>
          </Pressable>
        );
      }
      if (WidthScale >= 2) {
        return (
          <Pressable style={[renderstyle.listitems,{ width: Widthwrap(), height: size.height * HeightScale + 20 },]} onPress={action}>
            <LinearGradient style={renderstyle.gradient2} colors={[gradientcolor1, gradientcolor2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <View style={[renderstyle.inner, { width: innerareashare() }]}>
                <View style={[ renderstyle.innerner, { marginLeft: innerareaoffset() }]}>
                  <Useicon icon={icon} iconfontfamily={iconfontfamily} size={48}></Useicon>
                </View>
              </View>
              <View style = {{width: "50%"}}>
                <Text style={[ renderstyle.UnderlineText, { marginBottom: Marginbottom(), color: "#fff", fontFamily: "RobotoCondensedSemiBold"}]}>
                  {title}
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
        );
      }
    }
  };

  const render = ({ item }: any) => (
    <Rendererthingy title={item.title} icon={item.icon} iconfontfamily={item.iconfontfamily} gradientcolor1={item.gradientcolor1} gradientcolor2={item.gradientcolor2} WidthScale={item.WidthScale} HeightScale={item.HeightScale} saperator={item.saperator} hiddenonweb={item.hiddenonweb} action={item.action}></Rendererthingy>
  );

  return (
    <ThemedView style={indexstyle.backgroundcolor}>
      <ThemedView style={indexstyle.drawerheadermenu}>
        <ThemedText type="bold" style={{ marginLeft: 15, fontSize: 24 }}>Care to heart</ThemedText>
      </ThemedView>
      <ThemedView style={indexstyle.topbar}>
        <Link href={"/Form"} asChild={true}>
          <Pressable style={{ height: "100%", width: "100%" }}>
            <LinearGradient style={indexstyle.gradient} colors={[usecustomthemedcolor("topbar1"), usecustomthemedcolor("topbar2"),]} start={{ x: 0, y: 0 }}end={{ x: 1, y: 0 }}>
              <View style={indexstyle.Innerhiddentopbar}>
                <View style={indexstyle.textcontainertop}>
                  <ThemedText type="bold" style={indexstyle.texttop}>{localization("DiagnosisTop")}</ThemedText>
                  <Text style={indexstyle.textbottom}>{localization("DiagnosisBottom")}</Text>
                </View>
                <View style={indexstyle.imagecontainertop}>
                  <Image source={require("@/assets/images/explore.svg")} style={indexstyle.imagetop} contentFit="contain"></Image>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        </Link>
      </ThemedView>
      <ThemedView ColorToUse="saperator" style={indexstyle.saperator}></ThemedView>
      <View style={indexstyle.listview}>
        <FlatList
          data={homelistview}
          renderItem={render}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          numColumns={4}
          columnWrapperStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        ></FlatList>
      </View>
      <Settingmodal isVisible = {issettingvisible} onclose={() => setsettingvisible(false)}>
      </Settingmodal>
      <AboutModal isVisible={isaboutvisible}  onclose={() => setaboutvisible(false)}></AboutModal>
    </ThemedView>
  );
  
};

export default index;