import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";



type TypeProps={
    TypehandleChange: (type: number) => void;
    selectedType:number|undefined;
}



const MagicType=({TypehandleChange,selectedType}:TypeProps)=>{

   const [type,setType]=useState<number|undefined>(undefined);
 


   useEffect(()=>{

    if (selectedType!=null){
    
        setType(selectedType)
        };
    

   },[])
    
    

    

    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{


        const selectType=parseInt(e.target.value);
        //console.log(selectType);

        setType(selectType);


        TypehandleChange(selectType);
       
    };
    return (
        <div>
            <label >魔法カードのタイプを選択してください</label>
            <select  value={type} onChange={handleChange}>
                <option value={undefined}>選択してください</option>
                <option value={0}>通常魔法</option>
                <option value={1}>儀式魔法</option>
                <option value={2}>永続魔法</option>
                <option value={3}>装備魔法</option>
                <option value={4}>フィールド魔法</option>
                <option value={5}>速攻魔法</option>
            </select>
        </div>
    )
};

export default MagicType;