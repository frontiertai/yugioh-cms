import React from "react";
import { Monster, monsterAttribute, monsterType } from "../../pages/home/cardList";
import ImgAsset from "../ImgAsset";

type monsterListType={

    nextPage:(results:any[])=>void
    prevPage:()=>void;
    changePage:(number:number)=>void;
    getShowData:<T>(results:T[],offset:number)=>T[];
    getButtonCount:<T>(results: T[]) => number[];
    offset:number;
    setOffset:React.Dispatch<React.SetStateAction<number>>;
    Monsters:Monster[];
    monsterType: monsterType[];
    monsterAttribute: monsterAttribute[];
    isSelect:true|false;
    selectDeletedata:(isChecked:true|false,card_type_id:number,id:number)=>void;
    unitDeletedata:(card_type_id:number,id:number)=>void;
    isChecked:(card_type_id: number, id: number)=>boolean|undefined;
    toDetail:(id:number,type:number)=>void


}




const MonsterShow=({nextPage,prevPage,changePage,getShowData,getButtonCount,offset,setOffset,Monsters,monsterType,monsterAttribute,isSelect,selectDeletedata,unitDeletedata,isChecked,toDetail}:monsterListType)=>{



    return(
        <div className={`flex flex-col  justify-center items-center  space-y-20 `}>


        <div className="flex justify-center bg-red-600 text-white rounded-md py-2  w-[399px] h-[50px]">
            <div className="text-2xl">

                <th>モンスター 一覧</th>

            </div>
        </div>

        <div className="flex items-center space-x-3">
            <button
                className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                onClick={prevPage}
            >
                前へ
            </button>
            {getButtonCount(Monsters).map((count) => (
                <button
                    key={count}
                    className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
                    onClick={() => changePage(count)}
                >
                    {count}
                </button>
            ))}
            <button
                className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                onClick={() => nextPage(Monsters)}
            >
                次へ
            </button>
        </div>

        <div className={`flex flex-col space-y-20`}>




            <div className=" flex flex-col items-center justify-center space-y-10  ">


                <div className="flex flex-col items-center space-y-20">
                    {getShowData(Monsters, offset).map((monster) => (
                        <div key={monster.id} className="flex flex-col border border-red-600 rounded-md py-4 px-6 w-[798px] space-y-4">

                            {/* モンスター画像 */}
                            <div className="flex justify-center">
                                <ImgAsset src={monster.img_path} className="w-62 h-89" />
                            </div>

                            {/* モンスター情報 */}
                            <div className="flex flex-wrap justify-center space-x-10">
                                <div className="flex flex-col items-center space-y-2">
                                    <strong>モンスター名</strong>
                                    <span>{monster.name}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <strong>攻撃力</strong>
                                    <span>{monster.attack}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <strong>守備力</strong>
                                    <span>{monster.defense}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <strong>属性</strong>
                                    <span>{monsterAttribute[monster.monster_attribute_id].value}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <strong>レベル</strong>
                                    <span>{monster.level}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <strong>種族</strong>
                                    <span>{monsterType[monster.monster_type_id].value}</span>
                                </div>
                                {monster.effectText != null ? (
                                    <div className="flex flex-col items-center space-y-2">
                                        <strong>詳細</strong>
                                        <span className="text-sm">{monster.effectText}</span>
                                    </div>

                                ) : (<></>)}

                            </div>

                            {/* 詳細へボタン */}
                            <div className="flex space-x-4 justify-end">


                                {/* 削除・選択ボタン */}
                                {isSelect ? (
                                    <div className="flex items-center justify-center space-x-4">
                                        <span>選択</span>
                                        <input type="checkbox" onChange={(e) => selectDeletedata(e.target.checked, monster.card_type_id, monster.id)} checked={isChecked(monster.card_type_id, monster.id)} />
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <button className="bg-red-600 text-white rounded-md px-4 py-2 text-sm" onClick={() => toDetail(monster.id, monster.card_type_id)}>
                                                詳細へ
                                            </button>
                                        </div>
                                        <div className="flex justify-center">
                                            <button onClick={() => unitDeletedata(monster.card_type_id, monster.id)} className="bg-red-600 text-white text-sm rounded-md px-4 py-2">
                                                削除する
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                    ))}
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
            {getButtonCount(Monsters).map((count) => (
                <button
                    key={count}
                    className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
                    onClick={() => changePage(count)}
                >
                    {count}
                </button>
            ))}
            <button
                className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                onClick={() => nextPage(Monsters)}
            >
                次へ
            </button>
        </div>

    </div>

    );



}

export default MonsterShow