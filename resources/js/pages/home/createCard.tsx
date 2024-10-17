import React, { useRef, useState } from "react";
import "../../../css/app.css";
import "../../../css/createcard.css";
import { useForm, usePage } from "@inertiajs/react";
import MonsterType from "../../components/Monstertype";
import MonsterAttribute from "../../components/MonsterAttribute";
import MagicType from "../../components/MagicType";
import TrapType from "../../components/TrapType";


export type Monster={
   
    
    name:string;
    attack:number;
    defense:number;
    monster_attribute_id:number;
    level:number;
    monster_type_id:number;
    img_path:File|null;
    effectText:string;
}

export type Magic={
   
    
    name:string;
    magic_type_id:number;
    img_path:File|null;
    effectText:string;
}
export type Trap={
    
    
    name:string;
    trap_type_id:number;
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
        monster_attribute_id:(0),
        level:(0),
        monster_type_id:(0),
        img_path: null as File | null,
        effectText:"",

    });
    //魔法カードのuseForm
    const{data:magicdata,setData:setMagicData,post:magicPost,errors:magicErros}=useForm<Magic>({
        
        name:"",
        magic_type_id:(0),
        img_path: null as File | null,
        effectText:"",



    })

    const{data:trapdata,setData:setTrapData,post:trapPost,errors:trapErros}=useForm<Trap>({

        name:"",
        trap_type_id:(0),
        img_path: null as File | null,
        effectText:""


    })

   //どの種類のカードを変えるか決めるカード
    function OnSelect(choise:string){

        setChose(choise)
        console.log(choise)

    };

    //Submitするときに呼び出される関数
    //モンスター
    const HandleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        post(route('monster.store',{formForceData:true}));

    }
    //魔法
    const MagicHandleSubmit=(e:React.FormEvent)=>{
        console.log(e);
        e.preventDefault();
        
        magicPost(route('magic.store',{formForceData:true}));

    }
    //罠
    const TrapHandleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        trapPost(route('trap.store',{formForceData:true}));

    }


   //選択バーの状態更新
    const setAttribute=(attribute:number)=>setData("monster_attribute_id",attribute);
    const setType=(type:number)=>setData("monster_type_id",type);
    const setMagicType=(type:number)=>setMagicData("magic_type_id",type);
    const setTrapType=(type:number)=>setTrapData("trap_type_id",type);
    return(
        <div className="create_page">
            <div className="radio ">
                <div>
                    <label>モンスターカード</label>
                    <input name="radio" type="radio" onChange={()=>OnSelect("モンスターカード")}  />
                </div>
                <div className="flex flex-col space-x-4">
                    <label>魔法カード</label>
                    <input name="radio" type="radio" onChange={()=>OnSelect("魔法カード")}  />
                </div>
                <div className="flex flex-col space-x-4">
                    <label>トラップカード</label>
                    <input name="radio" type="radio" onChange={()=>OnSelect("トラップカード")}  />
                </div>
            </div>

            {chose === "モンスターカード" ? (
                <>
                <div className="text">モンスターの性能を入力してください</div>
                <div>
                    <form onSubmit={HandleSubmit} encType="multipart/form-data">
                    <input type="hidden" name="_token" value={csrfToken.current} />

                        <div>
                            <label>モンスター名を入力</label>
                            <input type="text" value={data.name} onChange={(e)=>setData('name',e.target.value)}/>
                            {errors['name'] && <p className="error-message">{errors['name']}</p>}
                        </div>
                        <div>
                            <label>攻撃力を入力</label>
                            <input type='number' value={data.attack} onChange={(e)=>setData('attack',parseInt(e.target.value))}/>
                            {errors['attack'] && <p className="error-message">{errors['attack']}</p>}
                        </div>
                        <div>
                            <label>防御力を入力</label>
                            <input type='number' value={data.defense} onChange={(e)=>setData('defense',parseInt(e.target.value))}/>
                            {errors['defense'] && <p className="error-message">{errors['defense']}</p>}
                        </div>
                        <div>
                            <MonsterAttribute AttributehandleChange={setAttribute}/>
                            {errors['monster_attribute_id'] && <p className="error-message">{errors['monster_attribute_id']}</p>}
                        </div>
                        <div>
                            <label>レベルを入力</label>
                            <input type='number' value={data.level} onChange={(e)=>setData('level',parseInt(e.target.value))}/>
                            {errors['level'] && <p className="error-message">{errors['level']}</p>}
                        </div>
                        <div>
                            <MonsterType TypehandleChange={setType}/>
                            {errors['monster_type_id'] && <p className="error-message">{errors['monster_type_id']}</p>}
                        </div>
                        <div>
                            <label>画像を入力</label>
                            <input type="file" onChange={(e)=>setData("img_path",e.target.files?.[0]||null)} />
                            {errors['img_path'] && <p className="error-message">{errors['img_path']}</p>}

                        </div>
                        <div className="effectText">
                            <label>必要であれば詳細を教えてください</label>
                            <input type="text" value={data.effectText} onChange={(e)=>setData('effectText',e.target.value)}/>
                        </div>
                       
                        <button className="button" type='submit'>登録する</button>

                        


                    </form>

                </div>
                </>


            ) : chose === "魔法カード" ? (
                <>
                <div className="text">魔法カードの性能を入力してください</div>
                <div>
                    
                    <form  className="form"onSubmit={MagicHandleSubmit} encType="multipart/form-data">
                    <input type="hidden" name="_token" value={csrfToken.current} />

                        <div>
                            <label>マジック名を入力</label>
                            <input type="text" value={magicdata.name} onChange={(e)=>setMagicData('name',e.target.value)}/>
                            {magicErros['name'] && <p className="error-message">{magicErros['name']}</p>}
                        </div>
                        <div>
                            <MagicType TypehandleChange={setMagicType}/>
                            
                            {magicErros['magic_type_id'] && <p className="error-message">{magicErros['magic_type_id']}</p>}
                        </div>
                        <div>
                            <label>画像を入力</label>
                            <input type="file" onChange={(e)=>setMagicData("img_path",e.target.files?.[0]||null)} />
                            {magicErros['img_path'] && <p className="error-message">{magicErros['img_path']}</p>}

                        </div>
                        <div className="effectText">
                            <label>必要であれば詳細を教えてください</label>
                            <input type="text" value={magicdata.effectText} onChange={(e)=>setMagicData('effectText',e.target.value)}/>
                        </div>
                        
                        

                        <button className="button"type='submit'>登録する</button>


                    </form>

                </div>
                </>

            ) : chose==="トラップカード"?(
                <>
                
                <div className="text">トラップカードの性能を入力してください</div>

                <div>
                    
                    <form onSubmit={TrapHandleSubmit} encType="multipart/form-data">
                    <input type="hidden" name="_token" value={csrfToken.current} />

                        <div>
                            <label>罠の名前を入力</label>
                            <input type="text" value={trapdata.name} onChange={(e)=>setTrapData('name',e.target.value)}/>
                            {trapErros['name'] && <p className="error-message">{trapErros['name']}</p>}
                        </div>
                        <div>
                            <TrapType TypehandleChange={setTrapType} />
                            {trapErros['trap_type_id'] && <p className="error-message">{trapErros['trap_type_id']}</p>}
                        </div>
                        <div>
                            <label>画像を入力</label>
                            <input type="file" onChange={(e)=>setTrapData("img_path",e.target.files?.[0]||null)} />
                            {trapErros['img_path'] && <p className="error-message">{trapErros['img_path']}</p>}

                        </div>
                        <div className="effectText">
                            <label>必要であれば詳細を教えてください</label>
                            <input type="text" value={trapdata.effectText} onChange={(e)=>setTrapData('effectText',e.target.value)}/>
                        </div>
                        

                        <button className="button"type='submit'>登録する</button>


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
    );
}



export default createCard;