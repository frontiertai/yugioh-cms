import React from 'react';
import ImgAsset from '../../components/ImgAsset';
import {Monster, Magic ,Trap} from './cardList';


type Props={
    props:Monster|Magic|Trap;
    errors:{};
}



const detail=(props:Props)=>{
    //console.log(props.props);
    const data=props.props;

    const handleClick=()=>{
        location.href = route('home')
    }
    const toEdit=(id:number ,type:number)=>{
        console.log(id);
        console.log(type);
        location.href=`/home/edit/${id}/${type}`;
    };


    
    return(
       <div>
            <div>
                <button onClick={handleClick}>一覧に戻る</button>
                <button onClick={()=>toEdit(data.id,data.card_type_id)}>編集する</button>
            </div>
            {data.card_type_id===1?(
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
                        <tr>
                            <td>{data.name}</td>
                            <td>{(data as Monster).attack}</td>
                            <td>{data.defense}</td>
                            <td>{data.monster_attribute_id}</td>
                            <td>{data.level}</td>
                            <td>{data.monster_type_id}</td>
                            <td>{data.effectText}</td>
                            <td><ImgAsset src={data.img_path} /></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            ):data.card_type_id===2?(
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
                            <tr>
                            <td>{data.name}</td>
                            <td>{data.magic_type_id}</td>
                            <td>{data.effectText}</td>
                            <td><ImgAsset src={data.img_path} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ):data.card_type_id===3?(
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
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.trap_type_id}</td>
                                <td>{data.effectText}</td>
                                <td><ImgAsset src={data.img_path} /></td>
                            </tr>
                         </tbody>
                    </table>
                </div>
            ):(
                <div>おめでとうあなたの勝ち</div>
            )
            }
        </div>
        
    );
};


export default detail;