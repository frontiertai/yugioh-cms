import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Monster } from "../pages/home/createCard";


type AttributeProps={
    AttributehandleChange: (attribute: number) => void;
    selectedAttribute:number|undefined;

}


const MonsterAttribute=({AttributehandleChange,selectedAttribute}:AttributeProps)=>{

   const [attribute,setAttribute]=useState<number|undefined>(undefined);


   useEffect(()=>{

   if(selectedAttribute!=undefined){
    setAttribute(selectedAttribute)
   };

   },[])

    

    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{


        const selectAttribute=parseInt(e.target.value);
        //console.log(selectAttribute);

        setAttribute(selectAttribute);


        AttributehandleChange(selectAttribute);
       
    };
    return (
        <div>
            <label >モンスターの属性を選択してください</label>
            <select  value={attribute} onChange={handleChange}>
                <option value={undefined}>選択してください</option>
                <option value={0}>獣戦士族</option>
                <option value={1}>海竜族</option>
                <option value={2}>岩石族</option>
                <option value={3}>植物族</option>
                <option value={4}>サイバース族</option>
                <option value={5}>幻竜族</option>
                <option value={6}>幻神獣族</option>
                <option value={7}>創造神族</option>
                <option value={8}>アンデット族</option>
                <option value={9}>恐竜族</option>
                <option value={10}>爬虫類族</option>
                <option value={11}>魚族</option>
                <option value={12}>天使族</option>
                <option value={13}>悪魔族</option>
                <option value={14}>サイキック族</option>
                <option value={15}>ドラゴン族</option>
                <option value={16}>魔法使い族</option>
                <option value={17}>戦士族</option>
                <option value={18}>鳥獣族</option>
                <option value={19}>炎族</option>
                <option value={20}>獣族</option>
                <option value={21}>機械族</option>
                <option value={22}>昆虫族</option>
                <option value={23}>雷族</option>
                <option value={24}>水族</option>
                <option value={25}>幻想魔族</option>
                                
            </select>
        </div>
    )
};

export default MonsterAttribute;