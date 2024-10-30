//カードの一覧を表示るすページ
import React, { useEffect, useState } from "react";
import ImgAsset from "../../components/ImgAsset";
import { route } from "ziggy-js";
import Search from "../../components/model/search";
import Delete,{Data} from "../../components/delete";



type Props = {
    monster: Monster[];
    magic: Magic[];
    trap: Trap[];
    monsterType: monsterType[];
    monsterAttribute: monsterAttribute[];
    magicType: magicType[];
    trapType: trapType[];
    filltar: MonsterQuery | MagicQuery | TrapQuery | any;
    element: number | null;
    page: number | null;
    AllCardData: any[];



}

export type Card = Monster | Magic | Trap;




export type monsterType = {
    id: number;
    value: string;
}
export type monsterAttribute = {
    id: number;
    value: string;
}

export type magicType = {
    id: number;
    value: string;
}

export type trapType = {
    id: number;
    value: string;
}


export type Monster = {
    id: number;
    card_type_id: number;
    name: string;
    attack: number;
    defense: number;
    monster_attribute_id: number;
    level: number;
    monster_type_id: number;
    img_path: string|null|any;
    effectText: string | null|any;
}

export type Magic = {
    id: number;
    card_type_id: number;
    name: string;
    magic_type_id: number;
    img_path: string|null|any;
    effectText: string | null|any;
}
export type Trap = {
    id: number;
    card_type_id: number;
    name: string;
    trap_type_id: number;
    img_path: string|null|any;
    effectText: string | null|any;
}

export type MonsterQuery = {

    card_type_id: string | null;
    name: string | null;
    minAttack: number | null;
    maxAttack: number | null;
    minDefense: number | null;
    maxDefense: number | null;
    monster_attribute_id: number | null;
    minLevel: number | null;
    maxLevel: number | null;
    monster_type_id: number | null;
}
export type MagicQuery = {
    card_type_id: string | null;
    name: string | null;
    magic_type_id: number | null;

}
export type TrapQuery = {
    card_type_id: string | null;
    name: string | null;
    trap_type_id: number | null;

}

const cardList = (props: Props) => {
    //console.log(props);
    //console.log(props.monster);
    //console.log(props.filltar);
    const monsterType = props.monsterType;
    const monsterAttribute = props.monsterAttribute;
    const magicType = props.magicType;
    const trapType = props.trapType;
    let filltar = props.filltar;

    const [chose, setChose] = useState<string>("");
    //const [filltar, setfilltar] = useState(Filltar);
    //console.log(filltar);
    //console.log(chose);











    //モーダル表示かを制御するuseState
    const [modal, setModal] = useState<true | false>(false);
    //検索前と検索語の制御を行うuseState(headerが検索前と後で異なるため)
    const [isSearch, setIsSearch] = useState<true | false>(false);



    //どの種類のカードを見るのか決めるカード
    function OnSelect(choise: string) {
        setChose(choise)
        //カードの種類が変わったタイミングでページも1ページ目に戻す
        setOffset(1);
        console.log(choise)
    };

    //詳細を見たいカードを定める関数
    const toDetail = (id: number, type: number) => {
        console.log(id);
        console.log(type);
        location.href = `home/detail/${id}/${type}`;
    };

    //絞り込みボタンを押すと呼び出される関数
    const toForm = (modal: true | false) => {

        filltar = ([]);
        if (modal == false) {
            setModal(true);


        } else {
            setModal(false);
        }

    };
    const Onsubmit = (isSearch: true | false) => {

        setIsSearch(true);

    }

    //検索後に出るリセットボタンを押すと呼び出される関数
    const toRest = () => {
        location.href = route('home')
    }


    //ページネーションに関する処理


    //カードの数を保持する数値ページネーションを実装する際に使用
    const Monsters = props.monster;
    const Magic = props.magic;
    const Trap = props.trap;
    const AllCardData = props.AllCardData;



    //見ているページの状態を管理
    const [offset, setOffset] = useState(1);

    //次のページに移動する際に働く関数(次へボタンを押した際)
    const nextPage = (results: any[]) => {

        const necessaryButtonCount = Math.ceil(results.length / 10);
        //見ているページが最後の場合はreturn
        console.log(necessaryButtonCount)
        console.log(offset)

        if (necessaryButtonCount === offset) return;
        //そうでない場合は次のページへ遷移
        setOffset((offset + 1));

    };

    //前のページに移動する際に働く関数(前へボタンを押した際)
    const prevPage = () => {

        if (offset == 1) return;
        setOffset(offset - 1);

    };
    //任意のページを押した際はそのページに
    const changePage = (number: number) => {
        setOffset(number);
    };


    //映すカードの配列を指定
    function getShowData<T>(results: T[], offset: number): T[] {

        //console.log(results);

        const firstArg = (offset - 1) * 10;
        const lastArg = offset * 10;
        // console.log(results.slice(firstArg, lastArg));


        return results.slice(firstArg, lastArg)

    }
    //映すボタンの指定
    function getButtonCount<T>(results: T[]): number[] {
        const necessaryButtonCount = Math.ceil(results.length / 10);

        const resultCount: number[] = [];


        for (let i = 0; i < necessaryButtonCount; i++) {
            resultCount.push(i + 1);
        }
        return resultCount;

    }

    //削除機能の実装

    const [DeleteData, setDeleteData] = useState<Data[]>([]);
    const [DeleteModal, setDeleteModal] = useState<true | false>(false);
    const [isSelect, setIsSelect] = useState<true | false>(false);

    //選択削除の処理

    //選択削除をユーザーが選んだ際に動く関数
    const setDeleteMode = () => {
        if (isSelect == false) {
            setIsSelect(true);

        } else {
            setIsSelect(false);
        }
        setDeleteData([]);



    }

    //まずは選択削除をユーザーが選択した際、出てくるチェックボックスが押されたデーターを格納
    const selectDeleteData = (isChecked: true | false, card_type_id: number, id: number,) => {

        //選択されたカードのカードタイプidとidがかぶっている場合、(2回押された場合削除とみなす)そのカードをデリート(チェックボックスとどうかできる場合はなし)
        /*if (DeleteData.find((data) => data.card_type_id == card_type_id) && DeleteData.find((data) => data.id == id)) {
            console.log(DeleteData);
            setDeleteData((prevDeleteData) =>
                prevDeleteData.filter((data) => !(data.card_type_id === card_type_id && data.id === id))
            );
            return
        }
        console.log(DeleteData);*/

        if (isChecked) {
            setDeleteData((prevDeleteData) => [...prevDeleteData, { card_type_id: card_type_id, id: id }])
            console.log("追加したよー")


        } else {
            setDeleteData((prevDeleteData) =>
                prevDeleteData.filter((data) => !(data.card_type_id === card_type_id && data.id === id))
            );
            console.log("消したよー")

        }





    }
    //ページ遷移した際、前のページのcheck状況を制御
    const isChecked = (card_type_id: number, id: number) => {
        if (DeleteData.find((data) => data.card_type_id == card_type_id) && DeleteData.find((data) => data.id == id)) {
            return true
        } else {
            false
        }


    };
    //選択後submitした場合確認モーダルに遷移
    const DeleteSubmit = () => {


        console.log(DeleteData);
        setDeleteModal(true);
    }

    //単体選択の際一つのデーターを格納またモーダルに遷移
    const unitDeletedata = (card_type_id: number, id: number) => {

        setDeleteData([{ card_type_id: card_type_id, id: id }])

        DeleteSubmit();


    }


    //削除を実行すると削除リストの初期化を行う
    const ResetDeleteData = () => {
        setDeleteData([]);

    }

    useEffect(() => {
        console.log(DeleteData);

    }, [DeleteData]);








    return (

        <>
            {/*絞り込み検索が行われる際に呼び出される */}

            {modal === true ? (<Search toForm={toForm} onSubmit={Onsubmit} modal={modal} isSearch={isSearch} />) : (<></>)}


            {/*削除確認が行われる際に呼び出される */}

            {DeleteModal === true ? (<Delete DeleteData={DeleteData} DeleteModal={DeleteModal} setDeleteModal={setDeleteModal} setIsSelect={setIsSelect} Reset={ResetDeleteData} />) : (<></>)}


            <div className="flex flex-col space-y-20 overflow-y-auto">



                <div className="flex h-24 bg-black text-white text-2xl justify-around px-4">
                    <div className="flex items-center">
                        <div>カード管理システム</div>
                    </div>
                    <div className="flex items-center space-x-10 ">
                        <a href={route('monster.create')} className="text-xl bg-blue-600 rounded-md px-2 py-2">
                            新規作成
                        </a>
                        {/*<button onClick={toRest} >
                    検索リセット
                </button>*/}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-20">
                    <div className=" flex  items-center justify-center space-y-10">

                        {isSearch == true ? (
                            <div className="flex  items-center space-x-10">
                                <div>
                                    {filltar.card_type_id == "1" ? (
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
                                                    <div>{filltar.name}</div>
                                                </div>
                                                {filltar.monster_type_id != null ? (
                                                    <div className="flex flex-col space-y-2 items-center">
                                                        <label>属性</label>
                                                        <div>{monsterType[filltar.monster_type_id].value}</div>
                                                    </div>
                                                ) : <></>}
                                                {filltar.monster_attribute_id != null ? (
                                                    <div className="flex flex-col space-y-2 items-center">
                                                        <label>種族</label>
                                                        <div>{monsterAttribute[filltar.monster_attribute_id].value}</div>
                                                    </div>

                                                ) : <></>}

                                                <div className="flex flex-col space-y-2 items-center">
                                                    <label>攻撃力</label>
                                                    <div className="flex space-x-2">
                                                        <div>{filltar.minAttack}</div>
                                                        <div>〜</div>
                                                        <div>{filltar.maxAttack}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col space-y-2 items-center">
                                                    <label>守備力</label>
                                                    <div className="flex space-x-2">
                                                        <div>{filltar.minDefense}</div>
                                                        <div>〜</div>
                                                        <div>{filltar.maxDefense}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col space-y-2 items-center">
                                                    <label>レベル</label>
                                                    <div className="flex space-x-2">
                                                        <div>{filltar.min_level}</div>
                                                        <div>〜</div>
                                                        <div>{filltar.max_level}</div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ) : filltar.card_type_id == "2" ? (
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
                                                    <div>{filltar.name}</div>
                                                </div>
                                                {filltar.magic_type_id != null ? (
                                                    <div className="flex flex-col space-y-2 items-center ">
                                                        <label>マジックタイプ</label>
                                                        <div>{magicType[filltar.magic_type_id].value}</div>
                                                    </div>

                                                ) : <></>}

                                            </div>

                                        </div>
                                    ) : filltar.card_type_id == "3" ? (
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
                                                    <div>{filltar.name}</div>
                                                </div>
                                                {filltar.trap_type_id != null ? (
                                                    <div className="flex flex-col space-y-2 items-center ">
                                                        <label>トラップタイプ</label>
                                                        <div>{trapType[filltar.trap_type_id].value}</div>
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

                    {chose === "モンスターカード" ? (
                        //モンスターを表示

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
                                                            <input type="checkbox" onChange={(e) => selectDeleteData(e.target.checked, monster.card_type_id, monster.id)} checked={isChecked(monster.card_type_id, monster.id)} />
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
                    ) : chose === "魔法カード" ? (
                        //魔法カードを表示
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
                                            className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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
                                        {/*{Magic.map((magic) => (
                                            <tr className="flex items-center justify-center  border border-blue-900 rounded-md py-2 px-10 w-[798px] h-[402px]">
                                                <tr className="w-1/3">
                                                    <td><ImgAsset src={magic.img_path} className="w-62 h-89" /></td>
                                                </tr>
                                                <tr key={magic.id} className=" w-2/3 grid grid-cols-3 gap-x-10 gap-y-10 text-xl  "  >
                                                    <tr className="col-span-1 row-span-3">
                                                        <tr className="flex flex-col space-y-4  items-center" >
                                                            <th>マジック名</th>
                                                            <td>{magic.name}</td>
                                                        </tr>

                                                    </tr>
                                                    <tr className="col-span-2 grid grid-cols-2 gap-4">
                                                        <tr className="flex flex-col space-y-4 justify-center items-center" >
                                                            <th>種類</th>
                                                            <td>{magicType[magic.magic_type_id].value}</td>
                                                        </tr>
                                                        <tr className="flex flex-col space-y-4 justify-center items-center" >
                                                            <th>詳細</th>
                                                            <td className="text-sm">{magic.effectText}</td>
                                                        </tr>
                                                    </tr>

                                                    <tr className="flex flex-col justify-items-center  ">
                                                        <button className=" bg-blue-900 text-white rounded-md py-2 px-2 " onClick={() => toDetail(magic.id, magic.card_type_id)}>詳細へ</button>
                                                    </tr>



                                                </tr>




                                            </tr>
                                        ))}*/}

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
                                            className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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
                    ) : chose === "トラップカード" ? (
                        //トラップカードを表示
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
                                            className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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
                                        className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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
                    ) : filltar.card_type_id != null ?
                        (
                            <div className={`flex flex-col  justify-center items-center space-y-20 `}>

                                {filltar.card_type_id == "1" ? (
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
                                                                        <input type="checkbox" onChange={(e) => selectDeleteData(e.target.checked, monster.card_type_id, monster.id)} checked={isChecked(monster.card_type_id, monster.id)} />
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

                                ) : filltar.card_type_id == "2" ? (
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
                                                        className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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
                                                        className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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
                                ) : filltar.card_type_id == "3" ? (
                                    <>
                                     //トラップカードを表示

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
                                                        className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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
                                                    className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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


                                ) : <></>}

                            </div>



                        ) : (
                            //何も選択されていない場合は全て表示

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
                                            className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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
                                            className={`border border-solid border-black  ml-1 flex justify-center items-center text-white ${count==offset?("bg-blue-900"):("bg-blue-600")} bg-blue-600 rounded-sm hover:bg-blue-900 w-[30px] h-[20px]`}
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











                        )}

                </div>
            </div >
        </>
    );

    //${modal == false ? 'overflow-auto' : ''}



}

export default cardList;