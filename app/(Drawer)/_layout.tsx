import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { usecustomthemedcolor } from "@/Hooks/ThemeManager";
import Customdrawercontent from "@/assets/Content/Customdrawercontent";
import { currentwindowdimention } from "@/Hooks/DynamicElements";
import { useContext } from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="index" 
          options={{
          }}
        />
        <Stack.Screen
          name="Form" 
          options={{
          }}
        />
        <Stack.Screen
          name="result" 
          options={{
          }}
        />
      </Stack>
  </GestureHandlerRootView>
  );
}
