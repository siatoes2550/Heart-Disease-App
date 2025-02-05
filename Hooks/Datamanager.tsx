import { ConditionMap, templatediagnosis, texteddiagnosis } from "@/Constant/DiagnosisList";
import AsyncStorage from "@react-native-async-storage/async-storage";

//let storeddata:any = null;
let storeddata:any = null;
let initiallyloaded:boolean = false;

const APIkey = process.env.EXPO_PUBLIC_APIKEY;
export const dataserverlink = process.env.EXPO_PUBLIC_DATA_SERVER;

// validate sent data (redundant, the validator should run before form submitting)
// type validatedkey = {
//   key: string,
//   argument: any,
// }
// const validatekey = ({argument, key}:validatedkey) => {
//   if ((texteddiagnosis).hasOwnProperty(key) == true){
//     const sterilizedargument = Object.values(argument)
//     console.log("data found!")
//     validateargument(argument)
//   }else{
//     console.log("validation check failed")
//   }
// };

// const validdatamodal = typeof Object.values(templatediagnosis)
// const validateargument = (argument: ConditionMap) => {
//   if (typeof argument == validdatamodal){
//     console.log("All done!")
//   }else{
//     console.log("Failed right after last step")
//   };
// }

// export const validatedata = async (argument:ConditionMap) => {
//   if ( argument != undefined ){
//     let validatedkey = Object.keys(argument)
//     let validatedargument = Object.values(argument)
//     validatedkey.forEach((parsedargument)=> validatekey({key: parsedargument, argument: validatedargument}))
//   }
//   else {
//     console.log("argument is undefined!")
//   }
// };

type argument = {
  gender: "male" | "female";
  location: string;
  result: number;
}

type argumenfordata = {
  arg : [keyof typeof texteddiagnosis]
};

type Datatosend = {
  [key: string]: any;  // Allow dynamic keys with string names
};


export const sendData = async ({arg}:argumenfordata) => {
  let datatosend:Datatosend = {...arg, "key":undefined};
  datatosend["key"] = APIkey;
  console.log(datatosend);
  try {
    fetch (dataserverlink,
      {method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datatosend),
      } 
    ) 
    console.log("Data sended successfully")
  } catch (error) {
    console.log(error)
  }
}

// // save local data
// const loadData = async () => {
//     let maxretry = 0
//     ////////////////////////
//     const mainfunctionality = () =>{
//       if (storeddata == null){
//         storeddata = []
//         saveData(storeddata.join("|"))
//         if (maxretry <= 4){
//           mainfunctionality();
//           maxretry + 1;
//         }else{
//           console.log("Sorry there was an issues handling your data") 
//         }
//       }else{
//         storeddata = loadhander()
//       }
//     };
//     const loadhander = async () => {
//       AsyncStorage.getItem('@SendedDataLog')
//     }
//     ///////////////////////////////
//     try {
//       mainfunctionality()
//     } catch (error) {
//       console.log(error);
//     }
// };

// const requiredKeys = ["gender", "location", "data1", "data2", "data3", "data4", "data5", "date","key"];
// const currentID = 2;

// export const Adddata = (argument: string[])=> {
//     let maxretry = 0
//     //////////////////////////
//     const mainfunctionality = () => {
//         if (initiallyloaded == false || storeddata == null){
//             if (maxretry <= 3){
//                 maxretry + 1;
//                 mainfunctionality();
//             }else{
//                 return "sorry there was a promblem loading your data";
//             }
//         }else{
//             if (requiredKeys.every(key => key in argument)){
//                 const sterilizedargument = argument.unshift(`ID:${currentID}`);
//                 storeddata.push(sterilizedargument.toString());
//                 saveData(storeddata.join("|"))
//                 loadData();
//             }
//             else {
//                 return "bad argument";
//             }
//         }
//     }
//     ///////////////////////////
//     mainfunctionality()
// };

// const erasedata = (argument: number) => {
//     let maxretry = 0
//     //////////////////////////
//     const mainfunctionality = () => {
//       if (initiallyloaded == false || storeddata == null){
//         if ( maxretry <= 3){
//           maxretry + 1
//           loadData()
//         }else{
//           return "sorry there was a promblem loading your data";
//         }
//       }else{
//         const arraytodelete = storeddata.keys()
//       }
//     }
//     ///////////////////////////
//     mainfunctionality()
// }

// export const erasealldata = () =>{
//     storeddata = []
//     saveData(storeddata.join("|"))
// }
// ;
// const getdatalength = async (argument:any) => {
//     return Object.keys(argument).length
// };

// const saveData = async (value:string) => {
//     try {
//         await AsyncStorage.setItem('@SendedDataLog', value);
//         loadData();
//     } catch (error) {
//         console.log(error);
//     }
// };

// const getID = (data:string[]) => {
//   let ids = [];
//   for (let i = 0; i < data.length; i++) {
//     let match = data[i].match(/ID:\s*(\d+)/);
//     if (match) {
//       ids.push(match[1]);
//     }
//   };
//   return ids;
// };

// const getAssociatedtablefromID = (ID:number) => {
//   type item = any
//   return storeddata.find((item:any )=> item.includes(`id: ${ID}`))
// };

// const IDgenerator = (items:string[]) => {
//     return items.length > 0 ? Math.max(...items.map(item => item.length)) + 1 : 1;
// };
