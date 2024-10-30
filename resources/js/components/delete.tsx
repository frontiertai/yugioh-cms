import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { route } from "ziggy-js";

type DeleteModaleComponent={
    DeleteData:Data[];
    DeleteModal:true|false;
    setDeleteModal:(modal:true|false)=>void;
    setIsSelect:(mode:true|false)=>void;
    Reset:()=>void;
    //label:string;

}
export type Data={
    card_type_id:number;
    id:number;
}
type FormData={
    Data:Data[];
}


const Delete=({DeleteData,DeleteModal,setDeleteModal,setIsSelect,Reset}:DeleteModaleComponent)=>{

    console.log(DeleteData);

    const[errorMessage,setErrorMessage]=useState<string>();


    

  
    const{data,setData,post,errors}=useForm<FormData>({
        Data:[],
    })


    const HandleSubmit=(DeleteData:Data[])=>{
        
        console.log(DeleteData);
        setData("Data",DeleteData);


        if(data.Data.length==0){
            setErrorMessage("カードが選択されていません。")
            
        };

        

        // setData({
        //     card_type_id:DeleteData.map(e => e.card_type_id),
        //     id:DeleteData.map(e => e.id!)
        // })
        
       
        //post(route('Delete'), { data, forceFormData: true });

    }

    useEffect(()=>{

        if(data.Data.length>0){
            console.log(data);
            setDeleteModal(false);
            setIsSelect(false);
            Reset();
            console.log(errors.Data);
            
            post(route('Delete'), { data, forceFormData: true });

        }
        

    },[data]);


    const toModal=()=>{
        if(DeleteModal==false){
            setDeleteModal(true);
            console.log(DeleteData);
            

        }
        else{
            setDeleteModal(false);
            
            
            
        }
       
    }

    
    

    return(
        <div >
        

        {DeleteModal==true?(
        <div>
            <div className="bg-white   w-[850px] h-[450px] translate-x-1/2 translate-y-1/4   rounded-lg z-40  " style={{position: 'fixed'}}>
                <div className="flex flex-col items-center justify-center space-y-20">
                    <div className="text-2xl">
                        削除しますか？
                    </div>
                    <div className="flex space-x-9">
                        <button className="flex items-center justify-center bg-red-600 text-white rounded-md w-[150px] h-[50px]"onClick={()=>HandleSubmit(DeleteData)}>はい</button>
                        <button className="flex items-center justify-center bg-blue-600 text-white rounded-md w-[150px] h-[50px]"onClick={toModal}>いいえ</button>

                    </div>
                    {errorMessage&&<p className="error-message text-sm">{errorMessage}</p>}

                </div>
               
            </div>

            <div className=" bg-black bg-opacity-50 w-full h-full z-10  " style={{position: 'fixed'}}>
            <button onClick={toModal} className="fixed w-full h-full"></button>

            </div>


        </div>
        ):(<></>)}
        </div>
    );


};

export default Delete;