import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ThemedPressable, ThemedText, usecustomthemedcolor, usethemedcolor } from '@/Hooks/ThemeManager'
import { Colorscheme } from '@/Constant/Color'
import { currentwindowdimention } from '@/Hooks/DynamicElements'
import { FlatList, Switch } from 'react-native-gesture-handler'
import { globalsettingconfig } from '@/Constant/SettingData'
import { Ionicons } from '@expo/vector-icons'
import { isweb } from '@/Hooks/DynamicElements'

// Custom Drawer Content that can be interacted with
function Customdrawercontent(){
  return (
    <View style={CustomDrawerStyle.ViewStyle}>
        <FlatList
            data={SettingData}
            renderItem={({ item: passingdata }: { item: ImportingString }) => (
                <RepeatingPressable
                    onpress={() => console.log(`Pressed ${passingdata.title}`)} // Example onPress handler
                    title={passingdata.title}
                    description={passingdata.description}
                    priority={passingdata.priority}
                    type={passingdata.type}
                    relatedaction={passingdata.relatedaction}
                    specialkey={passingdata.specialkey}
                />)
            }
        >
        </FlatList>
    </View>
  )
}

type Pressable = {
    onpress :() => void,
    title: string,
    description: string,
    priority: number,
    type: "Pressable"|"Toggle",
    relatedaction: string,
    specialkey?: string,
};

// Define Repeating Pressable to be rendered in flatlist
const RepeatingPressable = ({onpress, description, priority, type, title}:Pressable) => {
    if ( type === "Toggle" ){
        const [isenabled, Setisenabled] = useState(false);
        const togglestateswitch =() => Setisenabled(previousstate=>!previousstate);
        return(
            <ThemedPressable style={CustomDrawerStyle.RepeatableButton}>
                <View style = {CustomDrawerStyle.IconView}>
                    <Ionicons name="color-wand-outline" size={34} color= {usecustomthemedcolor("verycoolbuttonmode")}/>
                </View>
                <View style={CustomDrawerStyle.DescriptorViewstyle}>
                    <ThemedText type="semibold" style= {{fontSize: 16, marginLeft: 7}}>{title|| "No title provided"}</ThemedText>
                    <ThemedText type= "default" style = {CustomDrawerStyle.DescriptorText}>{description|| "No description provided"}</ThemedText>
                </View>
                <View style={CustomDrawerStyle.SwitchViewStyle}>
                    <Switch trackColor= {{false: usecustomthemedcolor("inactivetrackcolor"), true:usecustomthemedcolor("activetrackcolor")}} thumbColor={isenabled ? usecustomthemedcolor("activethumbcolor") : usecustomthemedcolor("inactivethumbcolor")} value = {isenabled} onValueChange={togglestateswitch}></Switch>
                </View>
            </ThemedPressable>
        )
    }
}

//Import all setting config desired from SettingData.tsx
type ImportingString = {
    title: string,
    description: string,
    priority: number,
    type: "Pressable" | "Toggle",
    relatedaction: string,
    specialkey: string,
};

const SettingData: ImportingString[] = Object.entries(globalsettingconfig).map(([key,value]) => ({ // entries is used to get entries on each in globalsettingconfig, map is to use to map value individaully
    title: value.title,
    description: value.description,
    priority: parseInt(value.priority),
    type: value.type == "Toggle"? value.type = "Toggle" : value.type = "Pressable",
    //type: value.type === "Pressable" || value.type === "Toggle" ? value.type : "Pressable",
    relatedaction: value.relatedaction,
    specialkey: value.specialkey ?? "none",
}));

//Import all action

//Const
const CustomDrawerStyle = StyleSheet.create({
    RepeatableButton:{
        height: isweb() == true? (currentwindowdimention.height/8) - 20 : (currentwindowdimention.height/8) - 12.5,
        width: "95%",
        marginTop: isweb() == true? 20:25,
        marginLeft: isweb() == true? 7:6,
        backgroundColor: "transparent",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    ViewStyle: {
        flex: 1,
        width: "100%",
        height: '100%',
        backgroundColor: usecustomthemedcolor("drawermenu"),
    },
    DescriptorViewstyle:{
        width: "62.5%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    SwitchViewStyle : {
        width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent:"center"
    },
    IconView: {
        width: "17.5%",
        height: "100%",
        justifyContent:"center",
        alignContent:"center",
        alignItems: "center",
    },
    DescriptorText : {
        fontSize: isweb() == true? 14:10,
        marginLeft: 7,
        marginTop:2 ,
        
    }
})
export default Customdrawercontent