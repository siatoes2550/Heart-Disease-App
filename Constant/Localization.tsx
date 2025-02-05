import { langcontext } from "@/Hooks/ContextProvider";
import { useContext, useEffect } from "react";
import { Appearance } from "react-native";
import { getLocales } from "expo-localization";
import { agedatacollect } from "./DiagnosisList";

type argument = keyof typeof localizationtable.en;
export function localization(argument:argument){
    const { language } = useLanguage()
    if (language == "th"){
        return localizationtable.th[argument]
    }else{
        return localizationtable.en[argument]
    };
};

export const useLanguage = () => {
    return useContext(langcontext);
};
const localizationtable = {
    th:{
        placeholder: "ลอเร็ม ลิปซัม",
        helper:"ผู้ช่วย ",
        about:"เกี่ยวกับแอป",
        setting: "การตั้งค่า",
        submitteddata: "ประวัติการส่งข้อมูล",
        actionbar: "เปิดเมนู ",
        DiagnosisTop: "การวินิจฉัยโรคหัวใจ",
        DiagnosisBottom: "ง่ายๆเพียงแค่คลิกแค่หนึ่งครั้ง!",
        ChangeLang: "ภาษาอังกฤษ",
        Close: "ปิด",
        Heart1: "โรคหัวใจคืออะไร",
        Heart2: "โรคหัวใจมีอาการอย่างไร",
        Heart3: "โรคหัวใจมีสาเหตุจากอะไร",
        Heart4: "ฉันมีความเสี่ยงในการเป็นโรคหัวใจไหม",
        returntohome: "กลับสู่หน้าหลัก",
        gender:"เพศ",
        Nothank:"ไม้เป็นไร.",
        Rateus: "แสดงความคิดเห็น",
        back:"ย้อนกลับ",
        Thankforrate:"ขอบคุณสำหรับความคิดเห็นของท่าน!",

        aboutdescription:'แอปพลิเคชัน Care for Heart จัดทำขึ้นเพื่อส่งเสริมการสร้างความตระหนักรู้และส่งเสริมการป้องกันโรคหัวใจและหลอดเลือด โดยเน้นให้ข้อมูลที่ชัดเจนเกี่ยวกับการตรวจสุขภาพประจำปีและการปฏิบัติตามคำแนะนำทางการแพทย์เพื่อรักษาสุขภาพที่ดีในระยะยาวจัดทำในรายวิชาโครงงาน โรงเรียน มอ.วิทยานุสรณ์ สุราษฎร์ธานี โดย นางสาว อานิษา กิจจารุนันท์,นายพิภู สมเกียรติกุล,นายรังสิมันต์ ชูทัพ',

        agedatacollection:"โปรดใส่อายุของท่าน",
        agedatacollectiondesc: "ข้อมูลส่วนเหล่านี้จะถูกนำมาใช้ในการศึกษาต่อไป",
        male:"ชาย",
        female:"หญิง",
        numonly: "กรุณาใส่เฉพาะตัวเลขเท่านั้น",
        rate:"ช่วยแสดงความคิดเห็นเพื่อนำไปปรับปรุงแอปเรา",
        helpusrate:"ช่วยแสดงความคิดเห็นเพื่อปรับปรุงแอปของเรา!",
        takemethere:"ทำแบบประเมิณแอปของเรา",

        experienceusingapp:"ประสบการณ์การใช้แอปพลิเคชั่นของเราเป็นอย่างไรบ้าง",
        layouting:"รูปแบบการจัดวางของแอป เป็นอย่างไร",
        easeofuse:"ลำดับขั้นตอนการกรอกฟอร์มและการใช้แอปเป็นอย่างไรบ้าง",
        diagnosisdata:"การประเมินความเสี่ยงของแอปเป็นอย่างไรบ้าง",
        overallsatisfaction:"ความพึงพอใจในภาพรวมของการใช้แอป",
        additionalsuggest:"ข้อเสนอแนะเพิ่มเติม",
        submit:"ส่งความคิดเห็น",

        risk1:`การประเมินความเสี่ยงในการเป็นโรคหัวใจของคุณในขณะนี้อยู่ในระดับต่ำมาก ซึ่งหมายความว่าโอกาสในการเกิดโรคหัวใจในอนาคตของคุณมีโอกาสค่อนข้างต่ำ นอกจากนี้ การรับประทานอาหารที่มีสารอาหารที่มีประโยชน์ เช่น อาหารที่อุดมไปด้วยไฟเบอร์และไขมันไม่อิ่มตัว ยังช่วยลดความเสี่ยงในการเกิดโรคหัวใจได้อย่างมีนัยสำคัญ (Pérez-Martínez et al., 2011)`,
        risk2:`การประเมินความเสี่ยงในการเป็นโรคหัวใจของคุณในขณะนี้อยู่ในระดับต่ำ อย่างไรก็ตาม การรักษาพฤติกรรมการใช้ชีวิตที่ดี เช่น การออกกำลังกายสม่ำเสมอ, การรับประทานอาหารที่มีประโยชน์, และการหลีกเลี่ยงความเครียด จะช่วยให้คุณลดความเสี่ยงได้มากยิ่งขึ้น(Thyfault & Booth, 2011)`,
        risk3:`จากการประเมินปัจจัยเสี่ยงต่างๆ พบว่าความเสี่ยงในการเกิดโรคหัวใจของคุณอยู่ในระดับปานกลาง ซึ่งหมายความว่าคุณอาจมีโอกาสในการเกิดโรคหัวใจมากกว่าผู้ที่ไม่มีปัจจัยเสี่ยง ตัวอย่างปัจจัยที่อาจเพิ่มความเสี่ยง ได้แก่ ความดันเลือดที่สูงเล็กน้อย, ระดับไขมันในเลือดที่สูง, การรับประทานอาหารที่มีไขมันอิ่มตัวสูง, หรือการไม่ออกกำลังกายอย่างสม่ำเสมอ (Sackett et al., 2017) งานวิจัยหลายชิ้นได้แสดงให้เห็นว่า การควบคุมปัจจัยเสี่ยงเหล่านี้สามารถลดความเสี่ยงในการเกิดโรคหัวใจได้อย่างมีนัยสำคัญ (Greenland et al., 2008) นอกจากนี้ การมีการตรวจสุขภาพประจำปีและการปรับพฤติกรรมการใช้ชีวิตจะช่วยลดความเสี่ยงในการเกิดโรคหัวใจในระยะยาว (Lloyd-Jones et al., 2006)`,
        risk4:`จากการประเมินความเสี่ยงในการเป็นโรคหัวใจของคุณในขณะนี้ พบว่าอยู่ในระดับค่อนข้างสูง ซึ่งหมายความว่าคุณอาจมีโอกาสเสี่ยงต่อการเกิดโรคหัวใจในอนาคตได้มากกว่าผู้ที่มีความเสี่ยงต่ำ โดยปัจจัยที่อาจทำให้ความเสี่ยงสูงขึ้นได้แก่ ความดันเลือดที่สูง, ระดับคอเลสเตอรอลหรือไขมันในเลือดที่ไม่สมดุล, การสูบบุหรี่, การขาดการออกกำลังกาย, และโรคเบาหวาน (Chowdhury et al., 2013; Kannel et al., 2003), หากสามารถปรับพฤติกรรมการดำเนินชีวิต เช่น ลดการบริโภคเกลือและไขมัน, ออกกำลังกายอย่างสม่ำเสมอ, ควบคุมความดันเลือด, และหลีกเลี่ยงการสูบบุหรี่ อาจช่วยลดความเสี่ยงในการเกิดโรคหัวใจได้อย่างมีนัยสำคัญ (Lloyd-Jones et al., 2006)`,
        risk5:`จากการประเมินความเสี่ยงในการเป็นโรคหัวใจของคุณในขณะนี้ พบว่าอยู่ในระดับค่อนข้างสูงมาก ซึ่งหมายความว่าคุณมีโอกาสเสี่ยงในการเกิดโรคหัวใจในอนาคตอย่างมาก ปัจจัยเสี่ยงที่สำคัญที่อาจทำให้ความเสี่ยงสูงขึ้นได้แก่ ความดันเลือดสูง, ระดับคอเลสเตอรอลหรือไขมันในเลือดที่สูง, การสูบบุหรี่, โรคเบาหวาน, และการขาดการออกกำลังกาย (Piepoli et al., 2016; Yousuf et al., 2015) โดยเฉพาะในผู้ที่มีโรคประจำตัวเช่น เบาหวานหรือความดันเลือดสูงที่ไม่ได้รับการควบคุมดี จะเพิ่มความเสี่ยงต่อการเกิดโรคหัวใจอย่างมาก (Bolen et al., 2007) ในกรณีนี้ การปรับเปลี่ยนพฤติกรรมโดยการควบคุมความดันเลือด, ลดระดับคอเลสเตอรอล, ออกกำลังกายอย่างสม่ำเสมอ, และการหลีกเลี่ยงการสูบบุหรี่จะช่วยลดความเสี่ยงในการเกิดโรคหัวใจได้อย่างมีประสิทธิภาพ (Stone et al., 2014)`,
    },
    en:{
        placeholder: "lorem lipsum",
        helper:"Helper",
        about:"About",
        setting: "settings",
        submitteddata: "Submitted Data",
        actionbar: "Action",
        DiagnosisTop: "Heart Disease Diagnosis",
        DiagnosisBottom: "Within a single click!",
        ChangeLang: "English",
        Close: "Close",
        Heart1: "What is heart disease",
        Heart2: "what the symptoms of heart disease",
        Heart3: "What caused health disease",
        Heart4: "Am i in risk of heart disease",
        returntohome: "Back to home screen",
        male:"male",
        female:"female",
        gender:"Gender",
        numonly: "Warning: only number are allowed",
        rate:"Help us improve our app",
        helpusrate:"Please provide your insight and comment on how could we made this app better!",
        takemethere:"Take me there",
        Nothank:"No thank.",
        Rateus: "Rate Us",
        Thankforrate:"Thank you for your suggestion!",

        agedatacollection:"What's your current ages?",
        agedatacollectiondesc: "The collected information will be used for research purpose only",
        aboutdescription: "App for health disease diagnosis, Made with love for school project.",

        experienceusingapp:"How was your experience using this app?",
        layouting:"How well was app layout designed?",
        easeofuse:"How was the ease of use for this app?",
        diagnosisdata:"How well was the app diagnosis option perform?",
        overallsatisfaction:"What's your overall satisfaction when using the app",
        additionalsuggest:"additional suggestion",
        submit:"submit",
        back:"back",

        risk1:`Your current risk of heart disease is very low, which means that the likelihood of developing heart disease in the future is quite low. Additionally, consuming a diet rich in beneficial nutrients, such as foods high in fiber and unsaturated fats, can significantly reduce the risk of heart disease (Pérez-Martínez et al., 2011).`,
        risk2:`Your current risk of heart disease is low. However, maintaining a healthy lifestyle, such as regular exercise, eating a nutritious diet, and avoiding stress, will further reduce your risk (Thyfault & Booth, 2011).`,
        risk3:`Based on the assessment of various risk factors, your risk of developing heart disease is moderate. This means that you may have a higher chance of developing heart disease compared to individuals without risk factors. Examples of factors that may increase your risk include slightly high blood pressure, high blood lipid levels, a diet high in saturated fats, or lack of regular exercise (Sackett et al., 2017). Numerous studies have shown that controlling these risk factors can significantly reduce the risk of heart disease (Greenland et al., 2008). Additionally, having regular health check-ups and adjusting your lifestyle behaviors will help reduce the long-term risk of heart disease (Lloyd-Jones et al., 2006).`,
        risk4:`Based on the assessment of your current risk of heart disease, it is found to be quite high. This means that you may have a greater risk of developing heart disease in the future compared to those with a lower risk. Factors that may increase your risk include high blood pressure, imbalanced cholesterol or blood lipid levels, smoking, lack of exercise, and diabetes (Chowdhury et al., 2013; Kannel et al., 2003). If you can adjust your lifestyle, such as reducing salt and fat intake, exercising regularly, controlling blood pressure, and avoiding smoking, it may significantly reduce your risk of developing heart disease (Lloyd-Jones et al., 2006).`,
        risk5:"Based on the assessment of your current risk of heart disease, it is found to be very high. This means that you have a significant risk of developing heart disease in the future. Major risk factors that may increase this risk include high blood pressure, high cholesterol or blood lipid levels, smoking, diabetes, and lack of exercise (Piepoli et al., 2016; Yousuf et al., 2015). This is especially true for individuals with chronic conditions such as uncontrolled diabetes or high blood pressure, which greatly increase the risk of heart disease (Bolen et al., 2007). In this case, behavioral changes such as controlling blood pressure, lowering cholesterol levels, exercising regularly, and avoiding smoking can effectively reduce the risk of heart disease (Stone et al., 2014).",
    }
}
