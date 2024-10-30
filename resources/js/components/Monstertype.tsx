
import React, { useEffect, useState } from "react";



type TypeProps={
    
    TypehandleChange:(type:number)=>void;
    selectedType:number|undefined;
}




const MonsterType=({TypehandleChange,selectedType}:TypeProps)=>{

    const[type,setType]=useState<number>(undefined);

    

    useEffect(()=>{
        if (selectedType!=undefined){
    
            setType(selectedType)
            };
    

    },[])



    

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
                <option value={0}>闇</option>
                <option value={1}>光</option>
                <option value={2}>地</option>
                <option value={3}>水</option>
                <option value={4}>炎</option>
                <option value={5}>風</option>
                <option value={6}>神</option>
                
            </select>
        </div>
    )
};

export default MonsterType;