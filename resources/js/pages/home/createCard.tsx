import React, { useRef, useState } from "react";
import "../../../css/app.css";
import "../../../css/createcard.css";
import { useForm, usePage } from "@inertiajs/react";
import MonsterType from "../../components/Monstertype";
import MonsterAttribute from "../../components/MonsterAttribute";
import MagicType from "../../components/MagicType";
import TrapType from "../../components/TrapType";
import { route } from "ziggy-js";


export type Monster={
   
    
    name:string;
    attack:number;
    defense:number;
    monster_attribute_id:number|undefined;
    level:number;
    monster_type_id:number|undefined;
    img_path:File|null;
    effectText:string;
}

export type Magic={
   
    
    name:string;
    magic_type_id:number|undefined;
    img_path:File|null;
    effectText:string;
}
export type Trap={
    
    
    name:string;
    trap_type_id:number|undefined;
    img_path:File|null;
    effectText:string;
}



const createCard=()=>{
    


    const[chose,setChose]=useState<string>("");

    
   


    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);


    
   //モンスターのuseForm
    const{data,setData,post,processing,errors}=useForm<Monster>({
        
        name:"",
        attack:(0),
        defense:(0),
        monster_attribute_id:undefined,
        level:(0),
        monster_type_id:undefined,
        img_path: null as File | null,
        effectText:"",

    });
    //魔法カードのuseForm
    const{data:magicdata,setData:setMagicData,post:magicPost,errors:magicErros}=useForm<Magic>({
        
        name:"",
        magic_type_id:undefined,
        img_path: null as File | null,
        effectText:"",



    })
    //トラップカードのuseForm
    const{data:trapdata,setData:setTrapData,post:trapPost,errors:trapErros}=useForm<Trap>({

        name:"",
        trap_type_id:undefined,
        img_path: null as File | null,
        effectText:""


    })

   //どの種類のカードを変えるか決めるカードまた、入力データーを初期値に戻す。
    function OnSelect(choise:string){

        setChose(choise)
        
       
        setData({
            name:"",
            attack:(0),
            defense:(0),
            monster_attribute_id:undefined,
            level:(0),
            monster_type_id:undefined,
            img_path: null as File | null,
            effectText:"",

        });
        setMagicData({
            name:"",
            magic_type_id:undefined,
            img_path: null as File | null,
            effectText:"",

        });
        setTrapData({
            name:"",
            trap_type_id:undefined,
            img_path: null as File | null,
            effectText:""

        })

        console.log(choise)

    };

    //Submitするときに呼び出される関数
    //モンスター
    const HandleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        post(route('monster.store',{forceFromData:true}));

    }
    //魔法
    const MagicHandleSubmit=(e:React.FormEvent)=>{
        console.log(e);
        e.preventDefault();
        
        magicPost(route('magic.store',{forceFromData:true}));

    }
    //罠
    const TrapHandleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        trapPost(route('trap.store',{forceFromData:true}));

    }


   //選択バーの状態更新
    const setAttribute=(attribute:number)=>setData("monster_attribute_id",attribute);
    const setType=(type:number)=>setData("monster_type_id",type);
    const setMagicType=(type:number)=>setMagicData("magic_type_id",type);
    const setTrapType=(type:number)=>setTrapData("trap_type_id",type);




    console.log(magicdata);
    return(
        
    <div className="flex flex-col space-y-20">

        <div className="flex h-24 bg-black text-white text-2xl justify-around px-4">
            <div className="flex items-center ">
                <div>カード管理システム</div>

            </div>
                
            <div  className="flex items-center">
                <a href={route('home')} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                    カード一覧に戻る
                </a>
            </div>
        </div>
        
        
        <div className="flex flex-col items-center justify-center space-y-20">
            <div className=" flex flex-col items-center justify-center space-y-10">
               

                <div className="flex space-x-10  ">
                    <div className=" flex flex-col items-center space-y-2 text-white bg-red-600 rounded-md px-4 py-2  w-[160px] h-[60px]">
                        <div>モンスターカード</div>
                        <input name="radio" type="radio" onChange={() => OnSelect("モンスターカード")} />
                    </div>
                    <div className=" flex flex-col items-center space-y-2 text-white bg-blue-900 rounded-md px-4 py-2 w-[160px] h-[60px]">
                        <div>魔法カード</div>
                        <input name="radio" type="radio" onChange={() => OnSelect("魔法カード")} />
                    </div>
                    <div className=" flex flex-col items-center space-y-2 text-white bg-yellow-400 rounded-md px-4 py-2 w-[160px] h-[60px]">
                        <div>トラップカード</div>
                        <input name="radio" type="radio" onChange={() => OnSelect("トラップカード")} />
                    </div>
                   


                </div>
            
            </div>

            {chose === "モンスターカード" ? (
                <>
                <div className="text-2xl font-bold">モンスターの性能を入力してください</div>
                <div>
                    <form onSubmit={HandleSubmit} encType="multipart/form-data" className="flex flex-col items-center justify-center space-y-4 border border-red-600 rounded-md p-4 w-[900px] h-[450px]">
                    <input type="hidden" name="_token" value={csrfToken.current} />

                        <div className="flex space-x-8">
                            <label>モンスター名を入力</label>
                            <input type="text" value={data.name} onChange={(e)=>setData('name',e.target.value)} className="border border-black rounded-sm"/>
                            
                            {errors['name'] && <p className="error-message text-sm">{errors['name']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <label>攻撃力を入力</label>
                            <input type='number' value={data.attack} onChange={(e)=>setData('attack',parseInt(e.target.value))} className="border  border-black rounded-sm"/>
                            {errors['attack'] && <p className="error-message text-sm">{errors['attack']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <label>防御力を入力</label>
                            <input type='number' value={data.defense} onChange={(e)=>setData('defense',parseInt(e.target.value))}className="border  border-black rounded-sm"/>
                            {errors['defense'] && <p className="error-message text-sm">{errors['defense']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <MonsterAttribute AttributehandleChange={setAttribute} selectedAttribute={undefined} />
                            {errors['monster_attribute_id'] && <p className="error-message text-sm">{errors['monster_attribute_id']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <label>レベルを入力</label>
                            <input type='number' value={data.level} onChange={(e)=>setData('level',parseInt(e.target.value))}className=" flex border  border-black rounded-sm" />
                            {errors['level'] && <p className="error-message text-sm">{errors['level']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <MonsterType TypehandleChange={setType} selectedType={undefined}/>
                            {errors['monster_type_id'] && <p className="error-message text-sm">{errors['monster_type_id']}</p>}
                        </div>
                        <div>
                            <label>画像を入力</label>
                            <input key={chose}id="monster"type="file"  onChange={(e)=>setData("img_path",e.target.files?.[0]||null)} />
                            {errors['img_path'] && <p className="error-message text-sm">{errors['img_path']}</p>}

                        </div>
                        <div className="flex space-x-8">
                            <label>必要であれば詳細を教えてください</label>
                            <input  className="w-48 h-12x border  border-black rounded-sm "type="text" value={data.effectText} onChange={(e)=>setData('effectText',e.target.value)}/>
                        </div>


                        <div className="flex justify-end">
                            <button className="flex items-center justify-center text-xl bg-blue-600 rounded-md px-2 py-4 text-white w-[100px] h-[50px]"type='submit'>登録する</button>
                        </div>
                       
                        


                    </form>

                </div>
                </>


            ) : chose === "魔法カード" ? (
                <>
                <div className="text-2xl">魔法カードの性能を入力してください</div>
                <div>
                    
                    <form  onSubmit={MagicHandleSubmit} encType="multipart/form-data" className="flex flex-col items-center justify-center space-y-4 border border-blue-900 rounded-md p-4 w-[900px] h-[450px]" >
                    <input type="hidden" name="_token" value={csrfToken.current} />

                        <div className="flex space-x-8">
                            <label>マジック名を入力</label>
                            <input type="text" value={magicdata.name} onChange={(e)=>setMagicData('name',e.target.value)} className="border border-black rounded-sm"/>
                            {magicErros['name'] && <p className="error-message text-sm">{magicErros['name']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <MagicType TypehandleChange={setMagicType} selectedType={undefined}/>
                            
                            {magicErros['magic_type_id'] && <p className="error-message text-sm">{magicErros['magic_type_id']}</p>}
                        </div>
                        <div>
                            <label>画像を入力</label>
                            <input key={chose} id="magic_img" type="file" onChange={(e)=>setMagicData("img_path",e.target.files?.[0]||null)} />
                            {magicErros['img_path'] && <p className="error-message text-sm">{magicErros['img_path']}</p>}

                        </div>
                        <div className="flex space-x-8">
                            <label>必要であれば詳細を教えてください</label>
                            <input className="w-48 h-12x border  border-black rounded-sm " type="text" value={magicdata.effectText} onChange={(e)=>setMagicData('effectText',e.target.value)}/>
                        </div>
                        <div className="flex justify-end">
                        <button className="flex items-center justify-center text-xl bg-blue-600 rounded-md px-2 py-4 text-white w-[100px] h-[50px]" type='submit'>登録する</button>

                        </div>
                        
                        

                        

                    </form>

                </div>
                </>

            ) : chose==="トラップカード"?(
                <>
                
                <div className="text-2xl">トラップカードの性能を入力してください</div>

                <div>
                    
                    <form onSubmit={TrapHandleSubmit} encType="multipart/form-data" className="flex flex-col items-center justify-center space-y-4 border border-yellow-400 rounded-md p-4 w-[900px] h-[450px]">
                    <input type="hidden" name="_token" value={csrfToken.current} />

                        <div className="flex space-x-8">
                            <label>罠の名前を入力</label>
                            <input type="text" value={trapdata.name} onChange={(e)=>setTrapData('name',e.target.value)} className="border border-black rounded-sm"/>
                            {trapErros['name'] && <p className="error-message text-sm">{trapErros['name']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <TrapType TypehandleChange={setTrapType} selectedType={undefined} />
                            {trapErros['trap_type_id'] && <p className="error-message text-sm">{trapErros['trap_type_id']}</p>}
                        </div>
                        <div>
                            <label>画像を入力</label>
                            <input key={chose} id="trap_img" type="file"  onChange={(e)=>setTrapData("img_path",e.target.files?.[0]||null)} />
                            {trapErros['img_path'] && <p className="error-message text-sm">{trapErros['img_path']}</p>}

                        </div>
                        <div className="flex space-x-8">
                            <label>必要であれば詳細を教えてください</label>
                            <input className="w-48 h-12x border  border-black rounded-sm " type="text" value={trapdata.effectText} onChange={(e)=>setTrapData('effectText',e.target.value)}/>
                        </div>


                        <div className="flex justify-end">
                            <button className="flex items-center justify-center text-xl bg-blue-600 rounded-md px-2 py-4 text-white w-[100px] h-[50px]" type='submit'>登録する</button>
                        </div>


                    </form>

                </div>
                
                </>
                    
            
            ):(
                <div className="text">どのカードを登録したいか選択してください</div>
            )}

            {/*<form action="/home/store" method='post' encType="multipart/form-data">
            <input type="hidden" name="_token" value={csrfToken.current} />

                <div>
                    <label>モンスター名を入力</label>
                    <input type="text" name='name'/>
                    {errors['name'] && <p className="error-message">{errors['name']}</p>}
                </div>
                <div>
                    <label>攻撃力を入力</label>
                    <input type='number' name='attack'/>
                    {errors['attack'] && <p className="error-message">{errors['attack']}</p>}
                </div>
                <div>
                    <label>防御力を入力</label>
                    <input type='number' name='defense'/>
                    {errors['defense'] && <p className="error-message">{errors['defense']}</p>}
                </div>
                <div>
                    <label>モンスター属性IDを入力</label>
                    <input type='number' name='monster_attribute_id'/>
                    {errors['monster_attribute'] && <p className="error-message">{errors['monster_attribute']}</p>}
                </div>
                <div>
                    <label>レベルを入力</label>
                    <input type='number' name='level'/>
                    {errors['level'] && <p className="error-message">{errors['level']}</p>}
                </div>
                <div>
                    <label>モンスタータイプIDを入力</label>
                    <input type='number' name='monster_type_id'/>
                    {errors['monster_type_id'] && <p className="error-message">{errors['monster_type_id']}</p>}
                </div>
                <div>
                    <label>画像を入力</label>
                    <input type="file" name="img_path" />
                    {errors['img_path'] && <p className="error-message">{errors['img_path']}</p>}

                </div>
                

                <button type='submit'>登録する</button>


            </form>
            <form action="/home/store/magic"method='post' encType="multipart/form-data">
            <input type="hidden" name="_token" value={csrfToken.current} />

                <div>
                    <label>マジック名を入力</label>
                    <input type="text" name='name'/>
                    {errors['name'] && <p className="error-message">{errors['name']}</p>}
                </div>
                <div>
                    <label>マジック属性IDを入力</label>
                    <input type='number' name='magic_type_id'/>
                    {errors['magic_type_id'] && <p className="error-message">{errors['magic_type_id']}</p>}
                </div>
                <div>
                    <label>画像を入力</label>
                    <input type="file" name="img_path" />
                    {errors['img_path'] && <p className="error-message">{errors['img_path']}</p>}

                </div>
                

                <button type='submit'>登録する</button>


            </form>
            <form action="/home/store/trap"method='post' encType="multipart/form-data">
            <input type="hidden" name="_token" value={csrfToken.current} />

                <div>
                    <label>罠の名前を入力</label>
                    <input type="text" name='name'/>
                    {errors['name'] && <p className="error-message">{errors['name']}</p>}
                </div>
                <div>
                    <label>トラップタイプのIDを入力</label>
                    <input type='number' name='trap_type_id'/>
                    {errors['trap_type_id'] && <p className="error-message">{errors['trap_type_id']}</p>}
                </div>
                <div>
                    <label>画像を入力</label>
                    <input type="file" name="img_path" />
                    {errors['img_path'] && <p className="error-message">{errors['img_path']}</p>}

                </div>
                

                <button type='submit'>登録する</button>


            </form>*/}
            
        </div>

    </div>
    );
}



export default createCard;