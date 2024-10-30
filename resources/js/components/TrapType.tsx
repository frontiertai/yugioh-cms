import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";



type TypeProps={
    TypehandleChange: (type: number) => void;
    selectedType:number|undefined;
}


const TrapType=({TypehandleChange,selectedType}:TypeProps)=>{

    

   const [type,setType]=useState<number|undefined>(undefined);

   
   

    useEffect(()=>{

        if (selectedType!=undefined){

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
            <label >トラップカードのタイプを選択してください</label>
            <select  value={type} onChange={handleChange}>
                <option value={undefined}>選択してください</option>
                <option value={0}>通常罠カード</option>
                <option value={1}>永続罠カード</option>
                <option value={2}>カウンター罠カード</option>
            </select>
        </div>
    )
};

export default TrapType;