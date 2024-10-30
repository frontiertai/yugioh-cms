//カードの一覧を表示るすページ
import React, { useState } from "react";
import ImgAsset from "../../components/ImgAsset";


type Props={
    monster:Monster[];
    magic:Magic[];
    trap:Trap[];

}


export type Monster={
    id:number;
    card_type_id:number;
    name:string;
    attack:number;
    defense:number;
    monster_attribute_id:number;
    level:number;
    monster_type_id:number;
    img_path:string;
    effectText:string|null;
}

export type Magic={
    id:number;
    card_type_id:number;
    name:string;
    magic_type_id:number;
    img_path:string;
    effectText:string;
}
export type Trap={
    id:number;
    card_type_id:number;
    name:string;
    trap_type_id:number;
    img_path:string;
    effectText:string;
}


const cardList=(props:Props)=>{
    //console.log(props);
    //console.log(props.monster);
    console.log(props.trap);
    const Monsters=props.monster;
    const Magic=props.magic;
    const Trap=props.trap;
    const[chose,setChose]=useState<string>("");



    //どの種類のカードを見るのか決めるカード
    function OnSelect(choise:string){
        setChose(choise)
        console.log(choise)
    };

    //詳細を見たいカードを定める関数
    const toDetail=(id:number ,type:number)=>{
            console.log(id);
            console.log(type);
            location.href=`home/detail/${id}/${type}`;
        };
  
    return(
        <div>
            <div>
                <a href={route('monster.create')}>新しくカードを作る</a>
            
                <div>
                    <input name="radio" type="radio" onChange={()=>OnSelect("モンスターカード")}  />
                    <input name="radio" type="radio" onChange={()=>OnSelect("魔法カード")}  />
                    <input name="radio" type="radio" onChange={()=>OnSelect("トラップカード")}  />
                </div>
            </div>
           {chose==="モンスターカード"?(
            //モンスターを表示
            <div>
                 <table>
            <thead>
                <tr>
                    
                    <th>モンスター名</th>
                    <th>攻撃力</th>
                    <th>守備力</th>
                    <th>属性</th>
                    <th>レベル</th>
                    <th>種族</th>
                    <th>詳細</th>
                </tr>
            </thead>
             <tbody>
                {Monsters.map((monster)=>(
                    <tr key={monster.id} >
                        <td>{monster.name}</td>
                        <td>{monster.attack}</td>
                        <td>{monster.defense}</td>
                        <td>{monster.monster_attribute_id}</td>
                        <td>{monster.level}</td>
                        <td>{monster.monster_type_id}</td>
                        <td>{monster.effectText}</td>
                    <td><ImgAsset src={monster.img_path} /></td>
                    </tr>

                ))}
            
            </tbody>
            </table>
            </div>
           ):chose==="魔法カード"?(
            //魔法カードを表示
            <div>
                 <table>
            <thead>
                <tr>
                    
                    <th>魔法名</th>
                    <th>種類</th>
                    <th>詳細</th>
                </tr>
            </thead>

             <tbody>
                {Magic.map((magic)=>(
                    <tr key={magic.id} >
                        <td>{magic.name}</td>
                        <td>{magic.magic_type_id}</td>
                    
                        <td>{magic.effectText}</td>
                    <td><ImgAsset src={magic.img_path} /></td>
                    </tr>

                ))}
            
            </tbody>
           </table>
            </div>
           ):chose==="トラップカード"?(
            //トラップカードを表示
            <div>
                 <table>
            <thead>
                <tr>
                    
                    <th>トラップ名</th>
                    <th>種類</th>
                    <th>詳細</th>
                </tr>
            </thead>

             <tbody>
                {Trap.map((trap)=>(
                    <tr key={trap.id} >
                        <td>{trap.name}</td>
                        <td>{trap.trap_type_id}</td>
                    
                        <td>{trap.effectText}</td>
                    <td><ImgAsset src={trap.img_path} /></td>
                    </tr>

                ))}
            
            </tbody>
           </table>
            </div>
           ):(
            //何も選択されていない場合は全て表示
            <div>
                <table>
                <thead>
                    <tr>
                        
                        <th>モンスター名</th>
                        <th>攻撃力</th>
                        <th>守備力</th>
                        <th>属性</th>
                        <th>レベル</th>
                        <th>種族</th>
                        <th>詳細</th>
                    </tr>
                </thead>
                <tbody>
                    {Monsters.map((monster)=>(
                        <tr key={monster.id} >
                            <td>{monster.name}</td>
                            <td>{monster.attack}</td>
                            <td>{monster.defense}</td>
                            <td>{monster.monster_attribute_id}</td>
                            <td>{monster.level}</td>
                            <td>{monster.monster_type_id}</td>
                            <td>{monster.effectText}</td>
                            <button onClick={()=>toDetail(monster.id,monster.card_type_id)}>詳細へ</button>
                        <td><ImgAsset src={monster.img_path} /></td>
                        </tr>

                    ))}
                
                </tbody>
                </table>
                <table>
                <thead>
                    <tr>
                        
                        <th>魔法名</th>
                        <th>種類</th>
                        <th>詳細</th>
                    </tr>
                </thead>
                            <tbody className="flex flex-col items-center space-y-20">
                                {Magic.map((magic) => (
                                    <div className="flex items-center  border border-blue-900 rounded-md py-2 px-10">
                                        <div className="w-1/3">
                                            <ImgAsset src={magic.img_path} />
                                        </div>
                                        <tr key={magic.id} className=" w-2/3 grid grid-cols-3 gap-x-20 gap-y-10 text-xl  "  >
                                            <div className="flex flex-col space-y-4 justify-center items-center" >
                                                <td>{magic.name}</td>
                            <td>{magic.magic_type_id}</td>
                        
                            <td>{magic.effectText}</td>
                        <td><ImgAsset src={magic.img_path} /></td>
                        <button onClick={()=>toDetail(magic.id,magic.card_type_id)}>詳細へ</button>
                        </tr>
                        

                    ))}
                
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        
                        <th>トラップ名</th>
                        <th>種類</th>
                        <th>詳細</th>
                    </tr>
                </thead>

                <tbody>
                    {Trap.map((trap)=>(
                        <tr key={trap.id}onClick={() => toDetail(trap.id,trap.card_type_id)} >
                            <td>{trap.name}</td>
                            <td>{trap.trap_type_id}</td>
                        
                            <td>{trap.effectText}</td>
                        <td><ImgAsset src={trap.img_path} /></td>
                        <button onClick={()=>toDetail(trap.id,trap.card_type_id)}>詳細へ</button>
                        </tr>

                    ))}
                
                </tbody>
            </table>

            </div>
           )

           }
           {/*<table>
            <thead>
                <tr>
                    
                    <th>モンスター名</th>
                    <th>攻撃力</th>
                    <th>守備力</th>
                    <th>属性</th>
                    <th>レベル</th>
                    <th>種族</th>
                    <th>詳細</th>
                </tr>
            </thead>
             <tbody>
                {Monsters.map((monster)=>(
                    <tr key={monster.id} >
                        <td>{monster.name}</td>
                        <td>{monster.attack}</td>
                        <td>{monster.defense}</td>
                        <td>{monster.monster_attribute_id}</td>
                        <td>{monster.level}</td>
                        <td>{monster.monster_type_id}</td>
                        <td>{monster.effectText}</td>
                    <td><ImgAsset src={monster.img_path} /></td>
                    </tr>

                ))}
            
            </tbody>
            </table>
            <table>
            <thead>
                <tr>
                    
                    <th>魔法名</th>
                    <th>種類</th>
                    <th>詳細</th>
                </tr>
            </thead>

             <tbody>
                {Magic.map((magic)=>(
                    <tr key={magic.id} >
                        <td>{magic.name}</td>
                        <td>{magic.magic_type_id}</td>
                    
                        <td>{magic.effectText}</td>
                    <td><ImgAsset src={magic.img_path} /></td>
                    </tr>

                ))}
            
            </tbody>
           </table>

           
           <table>
            <thead>
                <tr>
                    
                    <th>トラップ名</th>
                    <th>種類</th>
                    <th>詳細</th>
                </tr>
            </thead>

             <tbody>
                {Trap.map((trap)=>(
                    <tr key={trap.id} >
                        <td>{trap.name}</td>
                        <td>{trap.trap_type_id}</td>
                    
                        <td>{trap.effectText}</td>
                    <td><ImgAsset src={trap.img_path} /></td>
                    </tr>

                ))}
            
            </tbody>
           </table>
           */}
        </div>

    );
}

export default cardList;