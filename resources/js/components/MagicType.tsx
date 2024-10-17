import { useForm } from "@inertiajs/react";
import React, { useState } from "react";



type TypeProps={
    TypehandleChange: (type: number) => void;
}


const MagicType=({TypehandleChange}:TypeProps)=>{

   const [type,setType]=useState<number>(0);

    

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
                <option value={1}>通常魔法</option>
                <option value={2}>儀式魔法</option>
                <option value={3}>永続魔法</option>
                <option value={4}>装備魔法</option>
                <option value={5}>フィールド魔法</option>
                <option value={6}>速攻魔法</option>
            </select>
        </div>
    )
};

export default MagicType;