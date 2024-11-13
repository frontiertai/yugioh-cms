import React from "react";
import { magicType, Monster, monsterAttribute, monsterType, trapType } from "../../pages/home/cardList";
import ImgAsset from "../ImgAsset";

type CardListType = {

    nextPage: (results: any[]) => void
    prevPage: () => void;
    changePage: (number: number) => void;
    getShowData: <T>(results: T[], offset: number) => T[];
    getButtonCount: <T>(results: T[]) => number[];
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    AllCardData: any[];
    monsterType: monsterType[];
    monsterAttribute: monsterAttribute[];
    magicType: magicType[];
    trapType: trapType[];
    isSelect: true | false;
    selectDeleteData: (isChecked: true | false, card_type_id: number, id: number) => void;
    unitDeletedata: (card_type_id: number, id: number) => void;
    isChecked: (card_type_id: number, id: number) => boolean | undefined;
    toDetail: (id: number, type: number) => void


}




const AllcardShow = ({ nextPage, prevPage, changePage, getShowData, getButtonCount, offset, setOffset, AllCardData, monsterType, monsterAttribute, magicType, trapType, isSelect, selectDeleteData, unitDeletedata, isChecked, toDetail }: CardListType) => {



    return (

        <div className={`flex flex-col  justify-center items-center  space-y-20 `}>

            <div className="flex justify-center bg-red-600 text-white rounded-md py-2  w-[399px] h-[50px]">
                <div className="text-2xl">

                    <th>一覧</th>

                </div>
            </div>

            <div className="flex items-center space-x-3">
                <button
                    className="border border-solid border-[#333] w-[80px] h-[40px] text-white bg-blue-600 rounded-md hover:bg-blue-900"
                    onClick={prevPage}
                >
                    前へ
                </button>
                {getButtonCount(AllCardData).map((count) => (
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
                    onClick={() => nextPage(AllCardData)}
                >
                    次へ
                </button>
            </div>



            <div className=" flex flex-col items-center justify-center space-y20  ">

                <div className="flex flex-col items-center space-y-20">
                    {getShowData(AllCardData, offset).map((card) => {
                        return <>
                            {card.card_type_id == 1 ? (
                                <>
                                    <div className="flex flex-col border border-red-600 rounded-md py-4 px-6 w-[798px] space-y-4">
                                        <div className="flex justify-center">
                                            <ImgAsset src={card.img_path} className="w-62 h-89" />
                                        </div>

                                        <div key={card.id} className="flex flex-wrap justify-center space-x-10">
                                            <div className="flex flex-col items-center space-y-2">
                                                <div>モンスター名</div>
                                                <td>{card.name}</td>
                                            </div>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div>攻撃力</div>
                                                <td>{card.attack}</td>

                                            </div>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div>守備力</div>
                                                <td>{card.defense}</td>

                                            </div>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div>属性</div>
                                                <td>{monsterAttribute[card.monster_attribute_id].value}</td>

                                            </div>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div>レベル</div>
                                                <td>{card.level}</td>

                                            </div>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div>種族</div>
                                                <td>{monsterType[card.monster_type_id].value}</td>

                                            </div>
                                            {card.effectText != null ? (
                                                <div className="flex flex-col items-center space-y-2">
                                                    <strong>詳細</strong>
                                                    <span className="text-sm">{card.effectText}</span>
                                                </div>

                                            ) : (<></>)}
                                        </div>

                                        <div className="flex space-x-4 justify-end">


                                            {/* 削除・選択ボタン */}
                                            {isSelect ? (
                                                <div className="flex items-center justify-center space-x-4">
                                                    <span>選択</span>
                                                    <input type="checkbox" onChange={(e) => selectDeleteData(e.target.checked, card.card_type_id, card.id)} checked={isChecked(card.card_type_id, card.id)} />
                                                </div>
                                            ) : (
                                                <>
                                                    <div>
                                                        <button className="bg-red-600 text-white rounded-md px-4 py-2 text-sm" onClick={() => toDetail(card.id, card.card_type_id)}>
                                                            詳細へ
                                                        </button>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <button onClick={() => unitDeletedata(card.card_type_id, card.id)} className="bg-red-600 text-white text-sm rounded-md px-4 py-2">
                                                            削除する
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>










                                    </div>

                                </>

                            ) : card.card_type_id == 2 ? (
                                <>
                                    <div className="flex flex-col items-center  border border-blue-900 rounded-md py-10 px-10 w-[798px] h-[402px] space-y-8">
                                        <div >
                                            <ImgAsset src={card.img_path} className="w-62 h-89" />
                                        </div>
                                        <div key={card.id} className="flex flex-col justify-center items-center">
                                            <div className="flex space-x-4">
                                                <div className="flex flex-col items-center space-y-2">
                                                    <div>マジック名</div>
                                                    <div>{card.name}</div>
                                                </div>
                                                <div className="flex flex-col items-center space-y-2">
                                                    <div>種類</div>
                                                    <div>{magicType[card.magic_type_id].value}</div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-4">
                                                {card.effectText != null ? (
                                                    <div className="flex  flex-col items-center space-x-2">
                                                        <div>詳細</div>
                                                        <div>{card.effectText}</div>
                                                    </div>
                                                ) : (<></>)}
                                            </div>

                                            <div className="flex space-x-4 justify-end">
                                                {isSelect ? (
                                                    <div className="flex items-center justify-center space-x-4">
                                                        <span>選択</span>
                                                        <input type="checkbox" onChange={(e) => selectDeleteData(e.target.checked, card.card_type_id, card.id)} checked={isChecked(card.card_type_id, card.id)} />
                                                    </div>

                                                ) : (
                                                    <>
                                                        <div>
                                                            <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm" onClick={() => toDetail(card.id, card.card_type_id)}>
                                                                詳細へ
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <button onClick={() => unitDeletedata(card.card_type_id, card.id)} className="bg-red-600 text-white text-sm rounded-md px-4 py-2">
                                                                削除する
                                                            </button>
                                                        </div>
                                                    </>
                                                )}

                                            </div>

                                        </div>













                                    </div>
                                </>
                            ) : card.card_type_id == 3 ? (
                                <>
                                    <div className="flex  flex-col items-center  border  border-yellow-500 rounded-md py-2 px-10 w-[798px] h-[402px] space-y-8">
                                        <div>
                                            <ImgAsset src={card.img_path} className="w-62 h-89" />

                                        </div>

                                        <div key={card.id} className="flex flex-col justify-center items-center" >
                                            <div className="flex space-x-4">
                                                <div className="flex flex-col items-center space-y-2">
                                                    <div>トラップ名</div>
                                                    <div>{card.name}</div>

                                                </div>
                                                <div className="lex flex-col items-center space-y-2">
                                                    <div>種類</div>
                                                    <div>{trapType[card.trap_type_id].value}</div>

                                                </div>

                                            </div>

                                            <div className="flex space-x-4 justify-end">
                                                {isSelect ? (
                                                    <div className="flex items-center justify-center space-x-4">
                                                        <span>選択</span>
                                                        <input type="checkbox" onChange={(e) => selectDeleteData(e.target.checked, card.card_type_id, card.id)} checked={isChecked(card.card_type_id, card.id)} />
                                                    </div>

                                                ) : (
                                                    <>
                                                        <div>
                                                            <button className="bg-yellow-400 text-white rounded-md px-4 py-2 text-sm" onClick={() => toDetail(card.id, card.card_type_id)}>
                                                                詳細へ
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <button onClick={() => unitDeletedata(card.card_type_id, card.id)} className="bg-red-600 text-white text-sm rounded-md px-4 py-2">
                                                                削除する
                                                            </button>
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        </div>






                                    </div>

                                </>
                            ) : <></>}





                        </>
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
                {getButtonCount(AllCardData).map((count) => (
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
                    onClick={() => nextPage(AllCardData)}
                >
                    次へ
                </button>
            </div>

        </div>



    )


}

export default AllcardShow