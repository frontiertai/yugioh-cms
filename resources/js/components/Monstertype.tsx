
import React, { useState } from "react";



type TypeProps={
    
    TypehandleChange:(type:number)=>void;
}




const MonsterType=({TypehandleChange}:TypeProps)=>{

    const[type,setType]=useState<number>(0);



    

    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{

        const selectType=parseInt(e.target.value);
        setType(selectType);
        TypehandleChange(selectType);
        
    };
    return (
        <div>
            <label >モンスターのタイプを選択してください</label>
            <select value={type} onChange={handleChange}>
                <option value={undefined}>選択してください</option>
                <option value={1}>闇</option>
                <option value={2}>光</option>
                <option value={3}>地</option>
                <option value={4}>水</option>
                <option value={5}>炎</option>
                <option value={6}>風</option>
                <option value={7}>神</option>
                
            </select>
        </div>
    )
};

export default MonsterType;