import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { getmaximumrisk } from '@/Constant/DiagnosisList'

type variable = {
    totalriskaccumulation: number
    maximumrisk?: number 
};

export function Calculate ({totalriskaccumulation}:variable){ //ฟังชันที่ใช้ในการหาความเสี่ยง
    const maxrisk =  getmaximumrisk(); //ค่าความเสี่ยงที่เปฌนไปได้ทั้งหมด
    let riskaccumulated = (totalriskaccumulation/maxrisk)*100; //สูตร  = ค่าควาเสี่ยงจากการทำแบบประเมิน * 100/ค่าความเสี่ยงที่เป็นไปได้ทั้งหมด
    return riskaccumulated
};

type riskscore = {
    prevaccumulation? : number
    riskscore: number
};

export function updaterisk({ riskscore }: riskscore) {
    let accumulatedrisk = 0;
    accumulatedrisk = (accumulatedrisk + riskscore)
};
