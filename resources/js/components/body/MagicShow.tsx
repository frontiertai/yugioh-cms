import React from "react";
import { Magic, magicType } from "../../pages/home/cardList";
import ImgAsset from "../ImgAsset";

type magicListType={

    nextPage:(results:any[])=>void
    prevPage:()=>void;
    changePage:(number:number)=>void;
    getShowData:<T>(results:T[],offset:number)=>T[];
    getButtonCount:<T>(results: T[]) => number[];
    offset:number;
    setOffset:React.Dispatch<React.SetStateAction<number>>;
    Magic:Magic[];
    magicType: magicType[];
    isSelect:true|false;
    selectDeleteData:(isChecked:true|false,card_type_id:number,id:number)=>void;
    unitDeletedata:(card_type_id:number,id:number)=>void;
    isChecked:(card_type_id: number, id: number)=>boolean|undefined;
    toDetail:(id:number,type:number)=>void


}


const MagicShow=({nextPage,prevPage,changePage,getShowData,getButtonCount,offset,setOffset,Magic,magicType,isSelect,selectDeleteData,unitDeletedata,isChecked,toDetail}:magicListType)=>{




    return(
        <>
        <div className={`flex flex-col  justify-center items-center  space-y-20 `}>
            <div className="flex justify-center  bg-blue-900 text-white rounded-md py-2  w-[399px] h-[50px] space-y-20">
                <div className="text-2xl">

                    <th>魔法カード一覧</th>

                </div>
            </div>

            <div className="flex items-center space-x-3">
                <button
                    className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                    onClick={prevPage}
                >
                    前へ
                </button>
                {getButtonCount(Magic).map((count) => (
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
                    onClick={() => nextPage(Magic)}
                >
                    次へ
                </button>
            </div>
            <div className=" flex flex-col items-center justify-center space-y-10  ">


                <div className="flex flex-col items-center space-y-20">
                    {getShowData(Magic, offset).map((magic) => {
                        return <div className="flex flex-col items-center  border border-blue-900 rounded-md py-10 px-10 w-[798px] h-[402px] space-y-8">
                            <div>
                                <ImgAsset src={magic.img_path} className="w-62 h-89" />
                            </div>
                            <div key={magic.id} className="flex flex-col justify-center items-center"  >


                                <div className="flex space-x-4">
                                    <div className="flex flex-col items-center space-y-2">
                                        <div>マジック名</div>
                                        <div>{magic.name}</div>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div>種類</div>
                                        <div>{magicType[magic.magic_type_id].value}</div>
                                    </div>
                                </div>


                                <div className="flex space-x-4">
                                    {magic.effectText != null ? (
                                        <div className="flex  flex-col items-center space-x-2">
                                            <div>詳細</div>
                                            <div>{magic.effectText}</div>
                                        </div>
                                    ) : (<></>)}
                                </div>


                                <div className="flex space-x-4 justify-end">
                                    {isSelect ? (
                                        <div className="flex items-center justify-center space-x-4">
                                            <span>選択</span>
                                            <input type="checkbox" onChange={(e) => selectDeleteData(e.target.checked, magic.card_type_id, magic.id)} checked={isChecked(magic.card_type_id, magic.id)} />
                                        </div>

                                    ) : (
                                        <>
                                            <div>
                                                <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm" onClick={() => toDetail(magic.id, magic.card_type_id)}>
                                                    詳細へ
                                                </button>
                                            </div>
                                            <div className="flex justify-center">
                                                <button onClick={() => unitDeletedata(magic.card_type_id, magic.id)} className="bg-red-600 text-white text-sm rounded-md px-4 py-2">
                                                    削除する
                                                </button>
                                            </div>
                                        </>
                                    )}

                                </div>





                            </div>




                        </div>


                    })}
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <button
                    className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                    onClick={prevPage}
                >
                    前へ
                </button>
                {getButtonCount(Magic).map((count) => (
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
                    onClick={() => nextPage(Magic)}
                >
                    次へ
                </button>
            </div>
        </div>
    </>
    )

}

export default MagicShow;