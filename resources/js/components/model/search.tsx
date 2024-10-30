import { useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import MonsterAttribute from "../MonsterAttribute";
import MonsterType from "../Monstertype";
import MagicType from "../MagicType";
import TrapType from "../TrapType";
import { route } from "ziggy-js";


export type Monster = {


    card_type_id:number,
    name: string|null|any,
    minAttack: number|null|any ,
    maxAttack: number|null|any,
    minDefense: number|null|any ,
    maxDefense: number|null|any ,
    monster_attribute_id: number|undefined,
    minLevel: number|null|any ,
    maxLevel: number|null|any ,
    monster_type_id: number|undefined|any,
}

export type Magic = {
    card_type_id:number,
    name: string | null|any,
    magic_type_id: number | undefined|any,
}

export type Trap = {
    card_type_id:number,
    name: string | null|any,
    trap_type_id: number | undefined|any,
}

export type Name = {

    card_type_id:number,
    name: string | null|any,
}

export type ModalProps={
    toForm:(modal:true|false)=>void;
    onSubmit:(isSearch:true|false)=>void;
    modal:true|false;
    isSearch:true|false;
}






const Search = ({toForm,onSubmit,modal,isSearch}:ModalProps)=> {

    const [chose, setChose] = useState<string>("");
    //const[Modal,setModal]=useState<number>(0);

    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);


    


    //どの種類のカードを検索にかけるか
    function OnSelect(choise: string) {
        setChose(choise)
        console.log(choise)
    };

    


    //絞り込み情報の受け渡し
    //モンスター
    const toMonsterSearch = (e:React.FormEvent) => {

        
        console.log(data);
        toForm(modal);
        onSubmit(isSearch);
        e.preventDefault();
        post(route('home'), {forceFormData:true})

    };
    //マジック
    const toMagicSearch = (e:React.FormEvent) => {

        toForm(modal);
        onSubmit(isSearch);
        e.preventDefault();
        magicPost(route('home'),{forceFormData:true})

    };
    //トラップ
    const toTrapSearch = (e:React.FormEvent) => {

        toForm(modal);
        onSubmit(isSearch);
        e.preventDefault();
       trapPost(route("home"),{forceFormData:true})

    };
    //全て
    const toSearch = (e:React.FormEvent) => {

        toForm(modal);
        onSubmit(isSearch);
        e.preventDefault();
        location.href = `/home/search/4`

    };
    //モンスターのuseForm
    const { data, setData, post, errors } = useForm<Monster>({


        card_type_id:1,
        name: null,
        minAttack: null,
        maxAttack: null,
        minDefense:null,
        maxDefense:null,
        monster_attribute_id: undefined,
        minLevel:null,
        maxLevel:null,
        monster_type_id: undefined,


    });
    //魔法カードのuseForm
    const { data: magicdata, setData: setMagicData, post: magicPost,  } = useForm<Magic>({
        
        card_type_id:2,
        name: null,
        magic_type_id: undefined,



    })
    //トラップカードのuseForm
    const { data: trapdata, setData: setTrapData, post: trapPost, errors: trapErros } = useForm<Trap>({



        card_type_id:3,
        name: null,
        trap_type_id: undefined,

    })




    //選択バーの状態更新
    const setAttribute = (attribute: number) => setData("monster_attribute_id", attribute);
    const setType = (type: number) => setData("monster_type_id", type);
    const setMagicType = (type: number) => setMagicData("magic_type_id", type);
    const setTrapType = (type: number) => setTrapData("trap_type_id", type);





    //submitした時にそれぞれの入力内容がどこに当たるのか指定
    return (

        <div className="static">
            <div className="bg-white w-[850px] h-2/3 translate-x-1/2 translate-y-1/4 rounded-lg z-40 overflow-y-auto " style={{position: 'fixed'}}>
                <div className="flex justify-end px-4 py-10">
                    <button onClick={()=>{toForm(modal)}} className="flex items-center justify-center bg-red-600 text-white rounded-md w-[150px] h-[50px]">閉じる</button>
                </div>
                <div className="flex flex-col  items-center justify-center  space-y-4 ">
                    
                        <div className="text-2xl font-bold ">
                            カード検索
                        </div>

                    
                    {/*選択バー*/}
                    <div className="flex space-x-10 ">
                        <div className=" flex flex-col items-center justify-center space-y-2 text-white bg-red-600 rounded-md px-3 py-1 w-[180px] h-[50px] ">
                            <div>モンスターカード</div>
                            <input name="radio" type="radio" onChange={() => OnSelect("モンスターカード")} />
                        </div>
                        <div className=" flex flex-col items-center justify-center space-y-2 text-white bg-blue-900 rounded-md px-3 py-1 w-[180px] h-[50px]">
                            <div>魔法カード</div>
                            <input name="radio" type="radio" onChange={() => OnSelect("魔法カード")}/>
                        </div>
                        <div className=" flex flex-col items-center justify-center space-y-2 text-white bg-yellow-400 rounded-md px-3 py-1 w-[180px] h-[50px]">
                            <div>トラップカード</div>
                            <input name="radio" type="radio" onChange={() => OnSelect("トラップカード")} />
                        </div>
                        <div className=" flex flex-col items-center justify-center space-y-2  text-white bg-green-400 rounded-md px-3 py-1 w-[180px] h-[50px]">
                            <div>全て</div>
                            <input name="radio" type="radio" onChange={() => OnSelect("")} />
                        </div>


                    </div>

                    {chose == "モンスターカード" ? (
                        <>
                            {/*モンスターが選ばれた時*/}
                            <form onSubmit={toMonsterSearch} encType="multipart/form-data" className="flex flex-col space-y-4">
                            <input type="hidden" name="_token" value={csrfToken.current} />
                            <input type='hidden' value={data.card_type_id} />
                                <div>
                                    <div>カード名</div>
                                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}  className="border border-black rounded-sm"/>
                                </div>
                                <div>
                                    <div>属性</div>
                                    <MonsterAttribute AttributehandleChange={setAttribute} selectedAttribute={undefined} />
                                </div>
                                <div>
                                    <div>種族</div>
                                    <MonsterType TypehandleChange={setType} selectedType={undefined} />
                                </div>
                                <div>
                                    <div>レベル</div>
                                    <div className="flex space-x-2">
                                        <input type='number' value={data.minLevel} onChange={((e) => setData('minLevel', Number(e.target.value)))} className="border border-black rounded-sm" />
                                        <div>〜</div>
                                        <input type='number' value={data.maxLevel} onChange={((e) => setData('maxLevel',Number(e.target.value)))} className="border border-black rounded-sm" />
                                    </div>
                                </div>
                                <div>
                                    <div>攻撃力</div>
                                    <div className="flex space-x-2">
                                        <input type='number' value={data.minAttack} onChange={((e) => setData('minAttack',Number(e.target.value)))} className="border border-black rounded-sm" />
                                        <div>〜</div>
                                        <input type='number' value={data.maxAttack} onChange={((e) => setData('maxAttack',Number(e.target.value)))} className="border border-black rounded-sm" />
                                    </div>
                                </div>
                                <div>
                                    <div>守備力</div>
                                    <div className="flex space-x-2">
                                        <input type='number' value={data.minDefense} onChange={((e) => setData('minDefense',Number(e.target.value)))} className="border border-black rounded-sm" />
                                        <div>〜</div>
                                        <input type='number' value={data.maxDefense} onChange={((e) => setData('maxDefense',Number(e.target.value)))}  className="border border-black rounded-sm"/>
                                    </div>

                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="flex items-center justify-center text-xl bg-blue-600 rounded-md px-2 py-4 text-white w-[100px] h-[50px]">検索</button>
                                </div>


                            </form>

                        </>

                    ) : chose == "魔法カード" ? (
                        <>
                            {/*魔法が選ばれた時*/}
                            <form onSubmit={ toMagicSearch} encType="multipart/form-data" className="flex flex-col space-y-10">
                            <input type="hidden" name="_token" value={csrfToken.current} />
                            <input type='hidden' value={magicdata.card_type_id} />
                                <div>
                                    <div>名前</div>
                                    <input type="text" value={magicdata.name} onChange={(e) => setMagicData('name', e.target.value)} className="border border-black rounded-sm"/>
                                </div>
                                <div>
                                    <div>タイプ</div>
                                    <MagicType TypehandleChange={setMagicType} selectedType={undefined} />
                                </div>

                                <div  className="flex justify-end">
                                    <button type="submit" className="flex items-center justify-center text-xl bg-blue-600 rounded-md px-2 py-4 text-white w-[100px] h-[50px]">検索</button>
                                </div>
                            </form>

                        </>
                    ) : chose == "トラップカード" ? (
                        <>
                            {/*トラップが選ばれた時*/}
                            <form onSubmit={ toTrapSearch} encType="multipart/form-data" className="flex flex-col space-y-10">
                            <input type="hidden" name="_token" value={csrfToken.current} />
                            <input type='hidden' value={trapdata.card_type_id} />
                                <div>
                                    <div>名前</div>
                                    <input type="text" value={trapdata.name} onChange={(e) => setTrapData('name', e.target.value)} className="border border-black rounded-sm"/>
                                </div>
                                <div>
                                    <div>タイプ</div>
                                    <TrapType TypehandleChange={setTrapType} selectedType={undefined} />
                                </div>
            
                                <div className="flex justify-end">
                                    <button type="submit"className="flex items-center justify-center text-xl bg-blue-600 rounded-md px-2 py-4 text-white w-[100px] h-[50px]">検索</button>
                                </div>
                            </form>
                        </>

                    ) : (
                        <>
                            {/*全て選ばれた時*/}
                            {/*<form onSubmit={toSearch} className="flex flex-col space-y-20">
                                <div>
                                    <div></div>
                                    <input></input>
                                </div>
                            </form>*/}
                        </>
                    )

                    }


                    





                </div>

            </div>

            <div className=" bg-black bg-opacity-50 w-full h-full z-10  " style={{position: 'fixed'}}>
                <button onClick={()=>{toForm(modal)}} className="absolute w-full h-full"></button>

            </div>

       

        </div>

    );
}

export default Search