import { useForm } from "@inertiajs/react";
import React, { useState } from "react";



type TypeProps={
    TypehandleChange: (type: number) => void;
}


const TrapType=({TypehandleChange}:TypeProps)=>{

   const [type,setType]=useState<number>(0);

    

    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{


        const selectType=parseInt(e.target.value);
        //console.log(selectType);

        setType(selectType);


        TypehandleChange(selectType);
       
    };
    return (
        <div>
            <label >トラップカードのタイプを選択してください</label>
            <select  value={type} onChange={handleChange}>
                <option value={undefined}>選択してください</option>
                <option value={1}>通常罠カード</option>
                <option value={2}>永続罠カード</option>
                <option value={3}>カウンター罠カード</option>
            </select>
        </div>
    )
};

export default TrapType;