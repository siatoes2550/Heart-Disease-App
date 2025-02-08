import { useState, useEffect } from "react";
import { localization } from "./Localization";

interface Condition {
  Description: string; 
  Subdescription: string; 
  RenderPriority: number; 
  Option: Option[]; 
};

interface Option {
  Description: string; 
  DisplayIndex: number; 
  Riskfactor: number;
}

export interface ConditionMap {
  [key: string]: Condition; 
};

export const templatediagnosis:ConditionMap = {
  NameString: {
    Description: "String1", //STRING
    Subdescription:"String2", // STRING
    RenderPriority:0, // INT
    Option: [
      {
       Description:"Substring1" , // STRING
       DisplayIndex: 1, // INT
       Riskfactor: 1, // FLOAT
      },
      {
       Description:"Substring2",
       DisplayIndex:2, 
       Riskfactor: 0.65,
      },
      {
       Description:"Substring3",
       DisplayIndex:3,
       Riskfactor:0.5,
      },
      {
       Description:"Substring4",
       DisplayIndex:4,
       Riskfactor:0,
      },
     ], // ARRAY
   },
};

export const agedatacollect:ConditionMap = {
  Age:{
    Description:localization("agedatacollection"),
    Subdescription:localization("agedatacollectiondesc"),
    RenderPriority:1,
    Option:[
      {
        Description: "วัยรุ่น(อายุ 12-20 ปี)",
        Riskfactor:0,
        DisplayIndex: 1
      },
      {
        Description: "วัยผู้ใหญ่(อายุ 21-59ปี)",
        Riskfactor:0,
        DisplayIndex: 2
      },
      {
        Description: "วัยผู้สูงอายุ(อายุ 60-80 ปี)",
        Riskfactor:0,
        DisplayIndex: 3
      },
    ]
  },
  Gender:{
    Description:localization("gender"),
    Subdescription:localization("agedatacollection"),
    RenderPriority:2,
    Option:[
      {
        Description: "ผู้ชาย",
        Riskfactor:0,
        DisplayIndex: 1
      },
      {
        Description: "ผู้หญิง",
        Riskfactor:0,
        DisplayIndex: 2,
      },
    ]
  },

}

export const texteddiagnosis:ConditionMap = {
  ไม่สามารถนอนราบได้: {
    Description: "ฉันไม่สามารถนอนราบได้", //<--- หัวข้อ
    Subdescription:"นอนแล้วมีอาการเหนื่อยทำให้จำเป็นต้องลุกมานั่งอาการจึงจะดีขึ้น", //<--- ขยายหัวข้อ
    RenderPriority:1,
    Option: [
      {
       Description:"จริง และเกิดขึ้นบ่อยครั้ง" , //<--- คำอธิบายงักษณะความเสี่ยง
       DisplayIndex: 1, 
       Riskfactor: 1, 
      },
      {
       Description:"ค่อนข้างจริง เกิดขึ้นบ้างเป็นบางวัน", //<--- คำอธิบายงักษณะความเสี่ยง
       DisplayIndex:2, 
       Riskfactor: 0.8,
      },
      {
       Description:"ไม่เคยเกิดขึ้นเลย", //<--- คำอธิบายงักษณะความเสี่ยง
       DisplayIndex:3,
       Riskfactor:0.1,
      },
     ],
   },
  ใจสั่น: {
      Description: "ฉันมีอาการ ใจเต้น ใจสั่น",
      Subdescription:"ฉันรู้สึกว่ามีอาการใจสั่น เช่น รู้สึกหัวใจเต้นเร็วเร็วหรือช้าผิดปกติ",
      RenderPriority:3,
      Option: [
        {
        Description:"จริง และเกิดขึ้นบ่อย" ,
        DisplayIndex: 1, 
        Riskfactor: 1, 
        },
        {
        Description:"ค่อนข้างจริง เกิดเป็นครั้งคราว",
        DisplayIndex:2, 
        Riskfactor: 0.7,
        },
        {
        Description:"ไม่เคยเกิดขึ้นเลย",
        DisplayIndex:3,
        Riskfactor:0.3,
        },
      ],
    },
  หายใจได้ไม่เต็มปอด: {
    Description: "ฉันมีอาการหายใจเข้าได้ไม่เต็มปอด",
    Subdescription:"ฉันรู้สึกอึดอัด แน่นหน้าอก ต้องใช้แรงเยอะในการหายใจ",
    RenderPriority:2,
    Option: [
      {
        Description:"จริง และเกิดขึ้นบ่อยครั้ง" ,
        DisplayIndex: 1, 
        Riskfactor: 1, 
      },
      {
        Description:"ค่อนข้างจริง เกิดเป็นครั้งคราว",
        DisplayIndex:2, 
        Riskfactor: 0.6,
      },
      {
        Description:"ไม่เคยเกิดขึ้นเลย",
        DisplayIndex:3,
        Riskfactor:0.3,
      },
      ],
    },
  หน้ามืดตามัว: {
    Description: "ฉันมีอาการเป็นลมหน้ามืด หรือ หมดสติโดยไม่ทราบสาเหตุ",
    Subdescription:"คุณเคยมีอาการหน้ามืด ไร้เรี่ยวแรงหรือหมดสติโดยไม่ทราบสาเหตุไหม?",
    RenderPriority:4, // INT
    Option: [
      {
       Description:"บ่อยมากๆ เช่น 1 ถึง 7 ครั้งต่อสัปดาห์" , // STRING
       DisplayIndex: 1, // INT
       Riskfactor: 1, // FLOAT
      },
      {
       Description:"บ่อยครั้ง เช่น 1 ถึง 4 ครั้งต่อสัปดาห์",
       DisplayIndex:2, 
       Riskfactor: 0.5,
      },
      {
       Description:"น้อยครั้ง เช่น 1 ถึง 2 ครั้งต่อสัปดาห์",
       DisplayIndex:3,
       Riskfactor:0.4,
      },
      {
       Description:"ไม่มีเลย",
       DisplayIndex:4,
       Riskfactor:0.3,
      },
     ], // ARRAY
   },
   ประวัติคนในครอบครัว: {
    Description: "ฉันมีประวัติคนในครอบครัวเป็นโรคหัวใจและหลอดเลือด",
    Subdescription:"คนในครอบครัวของฉันมีประวัติเป็นโรคหัวใจและหลอดเลือด",
    RenderPriority:5,
    Option: [
      {
       Description:"จริง และคนในครอบครัวส่วนใหญ่เป็นโรคหัวใจและหลอดเลือด" ,
       DisplayIndex: 1, 
       Riskfactor: 1, 
      },
      {
       Description:"ฉันมีพ่อแม่หรือคนใกล้ชิดในครอบครัวเป็นโรคหัวใจและหลอดเลือด",
       DisplayIndex:2, 
       Riskfactor: 0.8,
      },
      {
       Description:"ฉันไม่เคยมีคนในครอบครัวเป็นโรคหัวใจและหลอดเลือดเลย",
       DisplayIndex:3,
       Riskfactor:0.1,
      },
     ],
    },
    เหนื่อยง่ายผิดปกติ: {
      Description: "ฉันรู้สึกเหนื่อยง่ายผิดปกติ",
      Subdescription:"มีอาการเหนื่อยล้าและเพลียไม่ว่าจะทำอะไรก็ตาม",
      RenderPriority:6,
      Option: [
        {
         Description:"จริง และมีอาการเหล่านั้นเกิดขึ้นบ่อยครั้ง" ,
         DisplayIndex: 1, 
         Riskfactor: 1, 
        },
        {
         Description:"ฉันมีอาการเหล่านี้เกิดขึ้นเป็นครั้งคราว",
         DisplayIndex:2, 
         Riskfactor: 0.7,
        },
        {
         Description:"ฉันไม่เคยมีอาการเหล่านี้เลย",
         DisplayIndex:3,
         Riskfactor:0.1,
        },
       ],
    },
    ดื่มแอลกอฮอล์น้ำอัดลม: {
      Description: "ฉันดื่มเครื่องดื่มแอลกอฮอล์/น้ำอัดลม",
      Subdescription:"ฉันดื่มเครื่องดื่มแอลกอฮอล์/น้ำอัดลมบ่อยครั้ง",
      RenderPriority:7,
      Option: [
        {
         Description:"เป็นความจริง" ,
         DisplayIndex: 1, 
         Riskfactor: 1, 
        },
        {
         Description:"ฉันดื่มบ้างเป็นครั้งคราว",
         DisplayIndex:2, 
         Riskfactor: 0.4,
        },
        {
         Description:"ฉันไม่เคยดื่มเลย",
         DisplayIndex:3,
         Riskfactor:0,
        },
       ],
     },
     เครียดกังวล: {
      Description: "ฉันมีภาวะความเครียด/ความกังวล",
      Subdescription:"ฉันดื่มเครื่องดื่มแอลกอฮอล์/น้ำอัดลมบ่อยครั้ง",
      RenderPriority:8,
      Option: [
        {
         Description:"เป็นความจริง" ,
         DisplayIndex: 1, 
         Riskfactor: 1, 
        },
        {
         Description:"ค่อนข้างจริง",
         DisplayIndex:2, 
         Riskfactor: 0.5,
        },
        {
         Description:"ฉันไม่มีภาวะความเครียดเลย",
         DisplayIndex:3,
         Riskfactor:0,
        },
       ],
     },
     สูบบุหรี่: {
      Description: "ฉันสูบบุหรี่หรือได้รับควันบุหรี่อย่างต่อเนื่อง",
      Subdescription:"ได้รับควันบุหรี่ไม่ว่าจะเกิดจากการสูบเอง หรือ จากคนรอบข้าง",
      RenderPriority:9,
      Option: [
        {
         Description:"ฉันสูบบุหรี่หนัก และ ได้รับจากคนรอบข้างด้วย" ,
         DisplayIndex:1, 
         Riskfactor: 1, 
        },
        {
         Description:"ฉันไม่เคยสูบบุหรี่ แต่คนรอบตัวสูบค่อนข้างเยอะ",
         DisplayIndex:2, 
         Riskfactor: 0.8,
        },
        {
         Description:"ฉันแทบไม่เคยได้รับควันบุหรี่เลย แต่ได้รับเป็นครั้งคราวเมื่ออยู่ตามที่สาธารณะ",
         DisplayIndex:3,
         Riskfactor:0.3,
        },
       ],
     },
     ความดันเบาหวาน: {
      Description: "ฉันเป็นโรคความดัน หรือ เบาหวาน",
      Subdescription: "ฉันมีประวัติหรือเป็นโรคความดันโลหิตสูง",
      RenderPriority: 10,
      Option: [
        {
         Description:"ฉันเป็นทั้งโรคความดันและเบาหวาน" ,
         DisplayIndex: 1, 
         Riskfactor: 1, 
        },
        {
         Description:"ฉันเป็นโรคความดันโลหิตสูงอย่างเดียว",
         DisplayIndex:2, 
         Riskfactor: 0.8,
        },
        {
         Description:"ฉันเป็นโรคเบาหวานอย่างเดียว",
         DisplayIndex:3,
         Riskfactor:0.8,
        },
        {
         Description:"ฉันไม่ได้เป็นโรคดังกล่าวเลย",
         DisplayIndex:4,
         Riskfactor:0.1,
        },
       ],
     },
};


//Calculate highest possible health risk
type maximum = {
  riskfactor: number;
}


export const getmaximumrisk = () => { //หาค่าความเสี่ยงทั้งหมดที่เป็นไปได้
  const [maximumrisktotal, setmaximumrisktotal] = useState<number>(0);

  useEffect(() => {
    let totalriskcal = 0;
    Object.entries(texteddiagnosis).forEach((key) => {//ในแต่ละข้อจะมีค่าความเสี่ยงอยู่ในช่วง 0-1 ฉะนั้น ค่าความเสี่ยงที่เป็นไปได้ทั้งหมดจะเป็น 1 * จำนวนข้อ
      totalriskcal += 1; 
    });
    setmaximumrisktotal(totalriskcal +1);
  }, []); 

  return maximumrisktotal;
};
