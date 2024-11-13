//編集する場合は数値の受け渡しも必要のため後で

import React from "react";
import { route } from "ziggy-js";

type HeaderType={
    Labels:string[],
    

}


const Header=({Labels}:HeaderType)=>{

    //label名毎に飛ぶ先を変更

    let routes:string[]=[];

    for(let i=0 ;i<Labels.length;i++){
        switch(Labels[i]){
            case "新規作成":
                routes.push("monster.create")
                break;

            case "テスト":
                routes.push("test")
                break;
            case "カード一覧に戻る":
                routes.push("home")
                break;
            case "編集する":
                routes.push("")
                break;

            
        }
        

    }

    return (
        <div className="flex h-24 bg-black text-white text-2xl justify-around px-4">
                    <div className="flex items-center">
                        <div>カード管理システム</div>
                    </div>
                    <div className="flex items-center space-x-10 ">
                        {Labels.map((label,index)=>(
                            <a href={route(`${routes[index]}`)} className="text-xl bg-blue-600 rounded-md px-2 py-2">
                            {label}
                            </a>
                            
                        ))}
                    </div>
        </div>

    );
}


export default Header;