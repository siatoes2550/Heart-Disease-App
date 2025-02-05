export const getmaximumrisk = () => { //หาค่าความเสี่ยงทั้งหมดที่เป็นไปได้
  const [maximumrisktotal, setmaximumrisktotal] = useState<number>(0);

  useEffect(() => {
    let totalriskcal = 0;
    Object.entries(texteddiagnosis).forEach((key) => {//ในแต่ละข้อจะมีค่าความเสี่ยงอยู่ในช่วง 0-1 ฉะนั้น ค่าความเสี่ยงที่เป็นไปได้ทั้งหมดจะเป็น 1 * จำนวนข้อ
      totalriskcal += 1; 
    });
    setmaximumrisktotal(totalriskcal);
  }, []); 

  return maximumrisktotal;
};

export function Calculate ({totalriskaccumulation}){ //ฟังชันที่ใช้ในการหาความเสี่ยง
    const maxrisk =  getmaximumrisk(); //ค่าความเสี่ยงที่เปฌนไปได้ทั้งหมด
    let riskaccumulated = (totalriskaccumulation/maxrisk)*100; //สูตร  = ค่าควาเสี่ยงจากการทำแบบประเมิน * 100/ค่าความเสี่ยงที่เป็นไปได้ทั้งหมด
    return riskaccumulated
};