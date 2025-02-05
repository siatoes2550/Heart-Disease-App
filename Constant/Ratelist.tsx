import { useEffect, useState } from "react";
import { localization } from "./Localization";

interface ratedata {
    description: string,
    priority: number
};

interface ratedatamap {
  [key: string]: ratedata; 
};

export const ratedata:ratedatamap = {
    ประสบการณ์การใช้แอป:{
        description: localization("experienceusingapp"),
        priority: 1
    },
    การจัดวางแอป:{
        description: localization("layouting"),
        priority: 2
    },
    ลำดับขั้นตอนการกรอกแบบฟอร์ม:{
        description: localization("easeofuse"),
        priority: 3
    },
    การประเมินความเสี่ยง:{
        description: localization("diagnosisdata"),
        priority: 4
    },
    ความพอใจโดยรวม:{
        description: localization("overallsatisfaction"),
        priority: 5
    },
}

export const maxratedata = () => {
  const [maxrate, setmaxrate] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    Object.entries(ratedata).forEach((key) => {//ในแต่ละข้อจะมีค่าความเสี่ยงอยู่ในช่วง 0-1 ฉะนั้น ค่าความเสี่ยงที่เป็นไปได้ทั้งหมดจะเป็น 1 * จำนวนข้อ
      total += 1; 
    });
    setmaxrate(total);
  }, []); 

  return maxrate;
}