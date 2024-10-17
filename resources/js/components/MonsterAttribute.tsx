import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Monster } from "../pages/home/createCard";


type AttributeProps={
    AttributehandleChange: (attribute: number) => void;
}


const MonsterAttribute=({AttributehandleChange}:AttributeProps)=>{

   const [attribute,setAttribute]=useState<number>(0);

    

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
                <option value={1}>獣戦士族</option>
                <option value={2}>海竜族</option>
                <option value={3}>岩石族</option>
                <option value={4}>植物族</option>
                <option value={5}>サイバース族</option>
                <option value={6}>幻竜族</option>
                <option value={7}>幻神獣族</option>
                <option value={8}>創造神族</option>
                <option value={9}>アンデット族</option>
                <option value={10}>恐竜族</option>
                <option value={11}>爬虫類族</option>
                <option value={12}>魚族</option>
                <option value={13}>天使族</option>
                <option value={14}>悪魔族</option>
                <option value={15}>サイキック族</option>
                <option value={16}>ドラゴン族</option>
                <option value={17}>魔法使い族</option>
                <option value={18}>戦士族</option>
                <option value={19}>鳥獣族</option>
                <option value={20}>炎族</option>
                <option value={21}>獣族</option>
                <option value={22}>機械族</option>
                <option value={23}>昆虫族</option>
                <option value={24}>雷族</option>
                <option value={25}>水族</option>
                <option value={26}>幻想魔族</option>
                                
            </select>
        </div>
    )
};

export default MonsterAttribute;