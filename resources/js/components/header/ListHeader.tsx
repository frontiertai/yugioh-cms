import React from"react";
import { MagicQuery, magicType, monsterAttribute, MonsterQuery, monsterType, TrapQuery, trapType } from "../../pages/home/cardList";

type ListHraderType={
    isSearch:boolean;
    isSelect:boolean;
    monsterType:monsterType[];
    monsterAttribute:monsterAttribute[];
    magicType:magicType[];
    trapType:trapType[];
    modal:true|false;
    OnSelect:(type:string)=>void;
    setDeleteMode:()=>void;
    toForm:(modal:true|false)=>void;
    toRest:()=>void;
    ToAPI:()=>void;
    setDeleteModal:React.Dispatch<React.SetStateAction<true|false>>;
    filter:MonsterQuery|MagicQuery|TrapQuery|any;
}


const ListHeader=({isSearch,isSelect,monsterType,monsterAttribute,magicType,trapType,
                    OnSelect,setDeleteMode,toForm,setDeleteModal,toRest,ToAPI,filter,modal}:ListHraderType)=>{

    return (
        <>
         <div className=" flex  items-center justify-center space-y-10">

{isSearch == true ? (
    <div className="flex  items-center space-x-10">
       
        <div>
            {filter.card_type_id == "1" ? (
                <div className="flex  flex-col space-y-4  text-xl">
                    <div>
                        絞り込み要素
                    </div>
                    <div className="flex text-sm font-bold space-x-4">
                        <div className="flex flex-col space-y-2 items-center ">
                            <label>種類</label>
                            <div>モンスターカード</div>
                        </div>
                        <div className="flex flex-col space-y-2 items-center ">
                            <label>名前</label>
                            <div>{filter.name}</div>
                        </div>
                        {filter.monster_type_id != null ? (
                            <div className="flex flex-col space-y-2 items-center">
                                <label>属性</label>
                                <div>{monsterType[filter.monster_type_id].value}</div>
                            </div>
                        ) : <></>}
                        {filter.monster_attribute_id != null ? (
                            <div className="flex flex-col space-y-2 items-center">
                                <label>種族</label>
                                <div>{monsterAttribute[filter.monster_attribute_id].value}</div>
                            </div>

                        ) : <></>}

                        <div className="flex flex-col space-y-2 items-center">
                            <label>攻撃力</label>
                            <div className="flex space-x-2">
                                <div>{filter.minAttack}</div>
                                <div>〜</div>
                                <div>{filter.maxAttack}</div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 items-center">
                            <label>守備力</label>
                            <div className="flex space-x-2">
                                <div>{filter.minDefense}</div>
                                <div>〜</div>
                                <div>{filter.maxDefense}</div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 items-center">
                            <label>レベル</label>
                            <div className="flex space-x-2">
                                <div>{filter.min_level}</div>
                                <div>〜</div>
                                <div>{filter.max_level}</div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : filter.card_type_id == "2" ? (
                <div className="flex  flex-col space-y-4  text-xl ">
                    <div>
                        絞り込み要素
                    </div>
                    <div className="flex text-sm font-bold space-x-4">
                        <div className="flex flex-col space-y-2 items-center ">
                            <label>種類</label>
                            <div>マジックカード</div>
                        </div>
                        <div className="flex flex-col space-y-2 items-center ">
                            <label>名前</label>
                            <div>{filter.name}</div>
                        </div>
                        {filter.magic_type_id != null ? (
                            <div className="flex flex-col space-y-2 items-center ">
                                <label>マジックタイプ</label>
                                <div>{magicType[filter.magic_type_id].value}</div>
                            </div>

                        ) : <></>}

                    </div>

                </div>
            ) : filter.card_type_id == "3" ? (
                <div className="flex  flex-col space-y-4  text-xl ">
                    <div>
                        絞り込み要素
                    </div>
                    <div className="flex text-sm font-bold space-x-4">
                        <div className="flex flex-col space-y-2 items-center ">
                            <label>種類</label>
                            <div>トラップカード</div>
                        </div>
                        <div className="flex flex-col space-y-2 items-center ">
                            <label>名前</label>
                            <div>{filter.name}</div>
                        </div>
                        {filter.trap_type_id != null ? (
                            <div className="flex flex-col space-y-2 items-center ">
                                <label>トラップタイプ</label>
                                <div>{trapType[filter.trap_type_id].value}</div>
                            </div>

                        ) : <></>}

                    </div>

                </div>

            ) : (<></>)

            }

        </div>

        {isSelect ? (
            <>
                <div className="flex flex-col justify-center space-y-4 ">

                    <div className="text-2xl">
                        削除したいカードを選択してください
                    </div>
                    <div className="flex space-x-4 justify-end p-4">
                        <button onClick={setDeleteMode} className="text-xl text-white bg-red-600 rounded-md px-2 py-2  w-[158px] h-[61px]">キャンセル</button>
                        <button onClick={() => setDeleteModal(true)} className="text-xl text-white bg-red-600 rounded-md px-2 py-2  w-[158px] h-[61px]">削除する</button>
                    </div>



                </div>

            </>

        ) : (
            <>
                <div>
                    <button onClick={toRest} className="text-xl text-white bg-blue-600 rounded-md px-2 py-2  w-[158px] h-[61px]" >検索リセット</button>
                </div>
                <div>
                    <button onClick={() => toForm(modal)} className="text-xl text-white bg-blue-600 rounded-md px-2 py-2  w-[158px] h-[61px]">絞り込み検索</button>
                </div>

                <div>
                    <button onClick={setDeleteMode} className="text-sm text-white bg-red-600 rounded-md px-2 py-2  w-[158px] h-[61px]">まとめて削除を行う</button>
                </div>
                <div>
                <button onClick={ToAPI} className="text-sm text-white bg-red-600 rounded-md px-2 py-2  w-[158px] h-[61px]">絞り込み結果をAPIにする</button>

                </div>

            </>

        )}


    </div>

) : isSelect != true ? (
    <>
        <div className="flex space-x-10  ">
            <div className=" flex flex-col items-center space-y-2 text-white bg-red-600 rounded-md px-4 py-2 w-[180px] h-[61px] ">
                <div>モンスターカード</div>
                <input name="radio" type="radio" onChange={() => OnSelect("モンスターカード")} />
            </div>
            <div className=" flex flex-col items-center space-y-2 text-white bg-blue-900 rounded-md px-4 py-2  w-[158px] h-[61px]">
                <div>魔法カード</div>
                <input name="radio" type="radio" onChange={() => OnSelect("魔法カード")} />
            </div>
            <div className=" flex flex-col items-center space-y-2 text-white bg-yellow-400 rounded-md px-4 py-2  w-[158px] h-[61px]">
                <div>トラップカード</div>
                <input name="radio" type="radio" onChange={() => OnSelect("トラップカード")} />
            </div>
            <div className=" flex flex-col items-center space-y-2  text-white bg-green-400 rounded-md px-4 py-2  w-[158px] h-[61px]">
                <div>全て</div>
                <input name="radio" type="radio" onChange={() => OnSelect("")} />
            </div>
            <div>
                <button onClick={() => toForm(modal)} className="text-xl text-white bg-blue-600 rounded-md px-2 py-2  w-[158px] h-[61px]">
                    絞り込み検索
                </button>
            </div>
            {isSelect == !true ? (
                <div>
                    <button onClick={setDeleteMode} className="text-sm text-white bg-red-600 rounded-md px-2 py-2  w-[158px] h-[61px]">まとめて削除を行う</button>
                </div>

            ) : (
                <></>

            )}

        </div>
    </>
) : (
    <div className="flex flex-col justify-center space-y-4 ">

        <div className="text-2xl">
            削除したいカードを選択してください
        </div>
        <div className="flex space-x-4 justify-end p-4">
            <button onClick={setDeleteMode} className="text-xl text-white bg-red-600 rounded-md px-2 py-2  w-[158px] h-[61px]">キャンセル</button>
            <button onClick={() => setDeleteModal(true)} className="text-xl text-white bg-red-600 rounded-md px-2 py-2  w-[158px] h-[61px]">削除する</button>
        </div>



    </div>
)
}
</div>


        </>
    )
}

export default ListHeader