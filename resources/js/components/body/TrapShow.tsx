import React from "react";
import { Trap, trapType } from "../../pages/home/cardList";
import ImgAsset from "../ImgAsset";


type trapListType={

    nextPage:(results:any[])=>void
    prevPage:()=>void;
    changePage:(number:number)=>void;
    getShowData:<T>(results:T[],offset:number)=>T[];
    getButtonCount:<T>(results: T[]) => number[];
    offset:number;
    setOffset:React.Dispatch<React.SetStateAction<number>>;
    Trap:Trap[];
    trapType: trapType[];
    isSelect:true|false;
    selectDeleteData:(isChecked:true|false,card_type_id:number,id:number)=>void;
    unitDeletedata:(card_type_id:number,id:number)=>void;
    isChecked:(card_type_id: number, id: number)=>boolean|undefined;
    toDetail:(id:number,type:number)=>void


}




const TrapShow=({nextPage,prevPage,changePage,getShowData,getButtonCount,offset,setOffset,Trap,trapType,isSelect,selectDeleteData,unitDeletedata,isChecked,toDetail}:trapListType)=>{


    return(
        <>
        <div className={`flex flex-col  justify-center items-center  space-y-20 `}>
            <div className="flex justify-center bg-yellow-400 text-white rounded-md py-2  w-[399px] h-[50px] space-y-20">
                <div className="text-2xl">
                    <th>トラップカード一覧</th>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <button
                    className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                    onClick={prevPage}
                >
                    前へ
                </button>
                {getButtonCount(Trap).map((count) => (
                    <button
                        key={count}
                        className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count == offset ? ("bg-blue-900") : ("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
                        onClick={() => changePage(count)}
                    >
                        {count}
                    </button>
                ))}
                <button
                    className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                    onClick={() => nextPage(Trap)}
                >
                    次へ
                </button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-10">


                <div className="flex flex-col items-center space-y-20">
                    {getShowData(Trap, offset).map((trap) => {
                        return <>
                            <div className="flex  flex-col items-center  border  border-yellow-500 rounded-md py-2 px-10 w-[798px] h-[402px] space-y-8">
                                <div>
                                    <ImgAsset src={trap.img_path} className="w-62 h-89" />

                                </div>

                                <div key={trap.id} className="flex flex-col justify-center items-center" >
                                    <div className="flex space-x-4">
                                        <div className="flex flex-col items-center space-y-2">
                                            <div>トラップ名</div>
                                            <div>{trap.name}</div>

                                        </div>
                                        <div className="lex flex-col items-center space-y-2">
                                            <div>種類</div>
                                            <div>{trapType[trap.trap_type_id].value}</div>

                                        </div>

                                    </div>

                                    <div className="flex space-x-4 justify-end">
                                        {isSelect ? (
                                            <div className="flex items-center justify-center space-x-4">
                                                <span>選択</span>
                                                <input type="checkbox" onChange={(e) => selectDeleteData(e.target.checked, trap.card_type_id, trap.id)} checked={isChecked(trap.card_type_id, trap.id)} />
                                            </div>

                                        ) : (
                                            <>
                                                <div>
                                                    <button className="bg-yellow-400 text-white rounded-md px-4 py-2 text-sm" onClick={() => toDetail(trap.id, trap.card_type_id)}>
                                                        詳細へ
                                                    </button>
                                                </div>
                                                <div className="flex justify-center">
                                                    <button onClick={() => unitDeletedata(trap.card_type_id, trap.id)} className="bg-red-600 text-white text-sm rounded-md px-4 py-2">
                                                        削除する
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>






                            </div>













                        </>

                    })}
                    {/*{Trap.map((trap) => (
                        <tr className="flex items-center justify-center border  border-yellow-500 rounded-md py-2 px-10 w-[798px] h-[402px]">
                            <tr className="w-1/3">
                                <td><ImgAsset src={trap.img_path} className="w-62 h-89" /></td>

                            </tr>

                            <tr key={trap.id} className="w-2/3 grid grid-cols-3 gap-x-10 gap-y-10 text-xl" >
                                <tr className="col-span-1 row-span-3">
                                    <tr className="flex flex-col space-y-4  items-center" >
                                        <th>トラップ名</th>
                                        <td>{trap.name}</td>
                                    </tr>

                                </tr>
                                <tr className="col-span-2 grid grid-cols-2 gap-4">
                                    <tr className="flex flex-col space-y-4  items-center">
                                        <th>種類</th>
                                        <td>{trapType[trap.trap_type_id].value}</td>
                                    </tr>
                                    <tr className="flex flex-col space-y-4  items-center">
                                        <th>詳細</th>
                                        <td className="text-sm">{trap.effectText}</td>
                                    </tr>

                                    <tr className="flex flex-col justify-items-center  ">
                                        <button className="bg-yellow-400 text-white rounded-md px-2 py-2" onClick={() => toDetail(trap.id, trap.card_type_id)}>詳細へ</button>

                                    </tr>

                                </tr>








                            </tr>
                        </tr>


                    ))}*/}

                </div>
            </div>


        </div>
        <div className="flex items-center space-x-3">
            <button
                className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                onClick={prevPage}
            >
                前へ
            </button>
            {getButtonCount(Trap).map((count) => (
                <button
                    key={count}
                    className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count == offset ? ("bg-blue-900") : ("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
                    onClick={() => changePage(count)}
                >
                    {count}
                </button>
            ))}
            <button
                className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                onClick={() => nextPage(Trap)}
            >
                次へ
            </button>
        </div>





    </>
    )
}
export default TrapShow;