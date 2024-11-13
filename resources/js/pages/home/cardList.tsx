//カードの一覧を表示るすページ
import React, { useEffect, useState } from "react";
import ImgAsset from "../../components/ImgAsset";
import { route } from "ziggy-js";
import Search from "../../components/model/search";
import Delete, { Data } from "../../components/delete";
import { useForm } from "@inertiajs/react";
import Header from "../../components/header/header";
import ListHeader from "../../components/header/listHeader";
import MonsterShow from "../../components/body/monsterShow";
import MagicShow from "../../components/body/MagicShow";
import TrapShow from "../../components/body/TrapShow";
import AllcardShow from "../../components/body/AllCardShow";


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
    img_path: string | null | any;
    effectText: string | null | any;
}

export type Magic = {
    id: number;
    card_type_id: number;
    name: string;
    magic_type_id: number;
    img_path: string | null | any;
    effectText: string | null | any;
}
export type Trap = {
    id: number;
    card_type_id: number;
    name: string;
    trap_type_id: number;
    img_path: string | null | any;
    effectText: string | null | any;
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

export type filltarProps = {
    Data: Monster[] | Magic[] | Trap[]

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



    //絞り込み結果を格納するuseForm

    const { data, setData: setData, post: post } = useForm<filltarProps>({

        Data: [],
    })

    //絞り込み結果をAPIに変換する処理
    const ToAPI = () => {
        if (filltar) {
            console.log(Monsters);
            console.log(Magic);
            console.log(Trap);


            switch (filltar.card_type_id) {
                case "1": {
                    setData("Data", Monsters);

                    break;
                }
                case "2": {
                    setData("Data", Magic);
                    break;
                }
                case "3": {
                    setData("Data", Trap);
                    break;
                }
            }

        } else {
            return;
        }
    }
    useEffect(() => {
        if (data.Data.length > 0) {
            post(route("toJson"), { data, forceFormData: true });

        }

    }, [data])

    return (
        <>
            {/*絞り込み検索が行われる際に呼び出される */}

            {modal === true ? (<Search toForm={toForm} onSubmit={Onsubmit} modal={modal} isSearch={isSearch} />) : (<></>)}


            {/*削除確認が行われる際に呼び出される */}

            {DeleteModal === true ? (<Delete DeleteData={DeleteData} DeleteModal={DeleteModal} setDeleteModal={setDeleteModal} setIsSelect={setIsSelect} Reset={ResetDeleteData} />) : (<></>)}


            <div className="flex flex-col space-y-20 overflow-y-auto">

                <Header Labels={["新規作成", "テスト"]} />

                <div className="flex flex-col items-center justify-center space-y-20">

                    <ListHeader
                        isSearch={isSearch}
                        isSelect={isSelect}
                        monsterType={monsterType}
                        monsterAttribute={monsterAttribute}
                        magicType={magicType}
                        trapType={trapType}
                        modal={modal}
                        OnSelect={OnSelect}
                        setDeleteModal={setDeleteModal}
                        toForm={toForm}
                        toRest={toRest}
                        ToAPI={ToAPI}
                        setDeleteMode={setDeleteMode}
                        filter={filltar}
                    />
                    {chose === "モンスターカード" ? (
                        //モンスターを表示
                        <MonsterShow
                            nextPage={nextPage}
                            prevPage={prevPage}
                            changePage={changePage}
                            getShowData={getShowData}
                            getButtonCount={getButtonCount}
                            offset={offset}
                            setOffset={setOffset}
                            Monsters={Monsters}
                            monsterType={monsterType}
                            monsterAttribute={monsterAttribute}
                            isSelect={isSelect}
                            selectDeletedata={selectDeleteData}
                            unitDeletedata={unitDeletedata}
                            isChecked={isChecked}
                            toDetail={toDetail}
                        />

                    ) : chose === "魔法カード" ? (
                        //魔法カードを表示
                        <>
                            <MagicShow
                                nextPage={nextPage}
                                prevPage={prevPage}
                                changePage={changePage}
                                getShowData={getShowData}
                                getButtonCount={getButtonCount}
                                offset={offset}
                                setOffset={setOffset}
                                Magic={Magic}
                                magicType={magicType}

                                isSelect={isSelect}
                                selectDeleteData={selectDeleteData}
                                unitDeletedata={unitDeletedata}
                                isChecked={isChecked}
                                toDetail={toDetail}
                            />


                        </>
                    ) : chose === "トラップカード" ? (
                        <>
                            <TrapShow
                                nextPage={nextPage}
                                prevPage={prevPage}
                                changePage={changePage}
                                getShowData={getShowData}
                                getButtonCount={getButtonCount}
                                offset={offset}
                                setOffset={setOffset}
                                Trap={Trap}
                                trapType={trapType}
                                isSelect={isSelect}
                                selectDeleteData={selectDeleteData}
                                unitDeletedata={unitDeletedata}
                                isChecked={isChecked}
                                toDetail={toDetail}
                            />


                        </>
                    ) : filltar.card_type_id != null ?
                        (
                            <div className={`flex flex-col  justify-center items-center space-y-20 `}>

                                {filltar.card_type_id == "1" ? (
                                    //モンスターを表示
                                    <MonsterShow
                                        nextPage={nextPage}
                                        prevPage={prevPage}
                                        changePage={changePage}
                                        getShowData={getShowData}
                                        getButtonCount={getButtonCount}
                                        offset={offset}
                                        setOffset={setOffset}
                                        Monsters={Monsters}
                                        monsterType={monsterType}
                                        monsterAttribute={monsterAttribute}
                                        isSelect={isSelect}
                                        selectDeletedata={selectDeleteData}
                                        unitDeletedata={unitDeletedata}
                                        isChecked={isChecked}
                                        toDetail={toDetail}
                                    />

                                ) : filltar.card_type_id == "2" ? (
                                    <>
                                        <MagicShow
                                            nextPage={nextPage}
                                            prevPage={prevPage}
                                            changePage={changePage}
                                            getShowData={getShowData}
                                            getButtonCount={getButtonCount}
                                            offset={offset}
                                            setOffset={setOffset}
                                            Magic={Magic}
                                            magicType={magicType}

                                            isSelect={isSelect}
                                            selectDeleteData={selectDeleteData}
                                            unitDeletedata={unitDeletedata}
                                            isChecked={isChecked}
                                            toDetail={toDetail}
                                        />


                                    </>

                                ) : filltar.card_type_id == "3" ? (
                                    <>
                                        <TrapShow
                                            nextPage={nextPage}
                                            prevPage={prevPage}
                                            changePage={changePage}
                                            getShowData={getShowData}
                                            getButtonCount={getButtonCount}
                                            offset={offset}
                                            setOffset={setOffset}
                                            Trap={Trap}
                                            trapType={trapType}
                                            isSelect={isSelect}
                                            selectDeleteData={selectDeleteData}
                                            unitDeletedata={unitDeletedata}
                                            isChecked={isChecked}
                                            toDetail={toDetail}
                                        />
                                    </>
                                ) : <></>}

                            </div>



                        ) : (
                            <>
                                <AllcardShow
                                    nextPage={nextPage}
                                    prevPage={prevPage}
                                    changePage={changePage}
                                    getShowData={getShowData}
                                    getButtonCount={getButtonCount}
                                    offset={offset}
                                    setOffset={setOffset}
                                    AllCardData={AllCardData}
                                    monsterType={monsterType}
                                    monsterAttribute={monsterAttribute}
                                    magicType={magicType}
                                    trapType={trapType}
                                    isSelect={isSelect}
                                    selectDeleteData={selectDeleteData}
                                    unitDeletedata={unitDeletedata}
                                    isChecked={isChecked}
                                    toDetail={toDetail}
                                />

                            </>
                        )}

                </div>
            </div >
        </>
    );

    //${modal == false ? 'overflow-auto' : ''}



}

export default cardList;