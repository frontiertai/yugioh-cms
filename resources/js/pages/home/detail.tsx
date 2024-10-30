import React from 'react';
import ImgAsset from '../../components/ImgAsset';
import { Monster, Magic, Trap } from './cardList';
import { CardFactory } from '../../viewModel/Card';
import { route } from 'ziggy-js';
import "../../../css/app.css";
type Props = {
    props: Monster | Magic | Trap;
    type:Type[];
    attribute:Attribute[]|null|any;

    // errors:{};
}
type Type={
    id:number;
    value:string;
}

type Attribute={
    id:number;
    value:string;
}



const detail = (props: Props) => {
    //console.log(props);
    //const data=props.props;

    // ビューモデルに書き換え
    const entity = CardFactory.createEntity(props.props)
    //return JSON.stringify(entity)
    //const j = JSON.parse(jsonStrint)
    console.log(props.type);

    const Type=props.type;
    const Attribute=props.attribute;

    console.log(entity)

    const handleClick = () => {
        location.href = route('home')
    }
    const toEdit = (id: number) => {
        location.href = `/home/edit/${id}/1`;
    };

    const toMagicEdit = (id: number) => {
        console.log(id);
        location.href = `/home/edit/${id}/2`;
    };
    const toTrapEdit = (id: number) => {
        console.log(id);
        location.href = `/home/edit/${id}/3`;
    };



    return (
        <div className='flex flex-col space-y-20'>


            {entity.get_card_type_id() === 1 ? (
                <>
                    <div className="flex h-24 bg-black text-white text-2xl  justify-around px-4">
                        <div className="flex items-center text-2xl ">
                            <div>カード管理システム</div>

                        </div>

                        <div className="flex items-center space-x-4 ">
                            <a href={route('home')} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                                カード一覧に戻る
                            </a>
                            <button onClick={() => toEdit(entity.get_id())} className="flex items-center justify-center text-xl  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">編集する</button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center   overflow-auto space-y-20 ">
                        <div className="flex justify-center bg-red-600 text-white rounded-md py-2 w-[399px] h-[50px]">
                            <div className="text-2xl">

                                <th>モンスター 詳細</th>

                            </div>
                        </div>
                        <div className=" overflow-auto space-y-20 ">


                            <table className=" flex flex-col  justify-center space-y-10  ">
                                <thead >
                                    <tr>

                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody className='flex justify-center items-center '>
                                    <tr className="flex items-center justify-center border border-red-600 rounded-md py-10 px-10 w-[900px] h-[450px]">
                                        <tr className="w-1/3 h-full">
                                            <td ><ImgAsset src={entity.get_img_path()} className="w-full h-ull" /></td>
                                        </tr>
                                        <tr className=" w-2/3 grid grid-cols-3 gap-x-20 gap-y-10 text-xl  ">
                                            <tr className="col-span-1 row-span-3">
                                                <tr className="flex flex-col space-y-4 items-center ">
                                                    <th>モンスター名</th>
                                                    <td>{entity.get_name()}</td>
                                                </tr>
                                            </tr>
                                            <tr className="col-span-2 grid grid-cols-2 gap-4">
                                                <tr className="flex flex-col space-y-4 justify-center items-center" >
                                                    <th>攻撃力</th>
                                                    <td>{entity.get_attack()}</td>
                                                </tr>
                                                <tr className="flex flex-col space-y-4 justify-center items-center">
                                                    <th>守備力</th>
                                                    <td>{entity.get_defense()}</td>
                                                </tr>
                                                <tr className="flex flex-col space-y-4 justify-center items-center">
                                                    <th>属性</th>
                                                    <td>{Attribute[entity.get_monster_attribute_id()].value}</td>
                                                </tr>
                                                <tr className="flex flex-col space-y-4 justify-center items-center">
                                                    <th>レベル</th>
                                                    <td>{entity.get_level()}</td>
                                                </tr>
                                                <tr className="flex flex-col space-y-4 justify-center items-center">
                                                    <th>種族</th>
                                                    <td>{Type[entity.get_type_id()].value}</td>
                                                </tr>
                                                <tr className="flex flex-col space-y-4 justify-center items-center">
                                                    <th>詳細</th>
                                                    <td className="text-sm">{entity.get_effectText()}</td>
                                                </tr>


                                            </tr>



                                        </tr>

                                    </tr>
                                </tbody>


                            </table>
                        </div>

                    </div>
                </>
            ) : entity.get_card_type_id() === 2 ? (
                <>
                    <div className="flex h-24 bg-black text-white text-2xl justify-around px-4">
                        <div className="flex items-center ">
                            <div>カード管理システム</div>

                        </div>

                        <div className="flex items-center space-x-4">
                            <a href={route('home')} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                                カード一覧に戻る
                            </a>
                            <button onClick={() => toMagicEdit(entity.get_id())} className="flex items-center justify-center text-xl  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">編集する</button>
                        </div>
                    </div>

                    <div className="flex flex-col  justify-center items-center overflow-auto space-y-20 ">
                        <div className="flex justify-center  bg-blue-900 text-white rounded-md py-2 w-[399px] h-[50px]">
                            <div className="text-2xl">

                                <th>魔法カード 詳細</th>

                            </div>
                        </div>
                        <div className="flex flex-col  overflow-auto space-y-20 "></div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="flex items-center justify-center border border-blue-900 rounded-md py-10 px-10 w-[900px] h-[450px]">
                                    <tr className="w-1/3 h-full">
                                        <td ><ImgAsset src={entity.get_img_path()} className="w-full h-ull" /></td>
                                    </tr>
                                    <tr className=" w-2/3 grid grid-cols-3 gap-x-20 gap-y-10 text-xl  ">
                                        <tr className="col-span-1 row-span-3">
                                            <tr className="flex flex-col space-y-4 items-center ">
                                                <th>魔法カード名</th>
                                                <td>{entity.get_name()}</td>
                                            </tr>
                                        </tr>
                                        <tr className="col-span-2 grid grid-cols-2 gap-4">
                                            <tr className="flex flex-col space-y-4 justify-center items-center" >
                                                <th>種類</th>
                                                <td>{Type[entity.get_type_id()].value}</td>
                                            </tr>
                                            <tr className="flex flex-col space-y-4 justify-center items-center">
                                                <th>詳細</th>
                                                <td className="text-sm">{entity.get_effectText()}</td>
                                            </tr>


                                        </tr>




                                    </tr>

                                </tr>
                            </tbody>

                        </table>
                    </div>





                </>
            ) : entity.get_card_type_id() === 3 ? (
                <>
                    <div className="flex h-24 bg-black text-white text-2xl justify-around px-4">
                        <div className="flex items-center ">
                            <div>カード管理システム</div>

                        </div>

                        <div className="flex items-center space-x-4">
                            <a href={route('home')} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                                カード一覧に戻る
                            </a>
                            <button onClick={() => toTrapEdit(entity.get_id())} className="flex items-center justify-center text-xl  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">編集する</button>
                        </div>
                    </div>

                    <div className="flex flex-col  justify-center items-center overflow-auto space-y-20 ">
                        <div className="flex justify-center bg-yellow-500 text-white rounded-md py-2 w-[399px] h-[50px]">
                            <div className="text-2xl">

                                <th>トラップカード 詳細</th>

                            </div>
                        </div>
                        <div className="flex flex-col  overflow-auto space-y-20 "></div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="flex items-center justify-center  border border-yellow-500 rounded-md py-10 px-10 w-[900px] h-[450px]">
                                    <tr className="w-1/3 h-full">
                                        <td ><ImgAsset src={entity.get_img_path()} className="w-full h-ull" /></td>
                                    </tr>
                                    <tr className=" w-2/3 grid grid-cols-3 gap-x-20 gap-y-10 text-xl  ">
                                        <tr className="col-span-1 row-span-3">
                                            <tr className="flex flex-col space-y-4 items-center ">
                                                <th>トラップカード名</th>
                                                <td>{entity.get_name()}</td>
                                            </tr>
                                        </tr>
                                        <tr className="col-span-2 grid grid-cols-2 gap-4">
                                            <tr className="flex flex-col space-y-4 justify-center items-center" >
                                                <th>種類</th>
                                                <td>{Type[entity.get_type_id()].value}</td>
                                            </tr>
                                            <tr className="flex flex-col space-y-4 justify-center items-center">
                                                <th>詳細</th>
                                                <td className="text-sm">{entity.get_effectText()}</td>
                                            </tr>


                                        </tr>




                                    </tr>

                                </tr>
                            </tbody>

                        </table>
                    </div>
                </>
            ) : (
                <div>おめでとうあなたの勝ち</div>
            )
            }
        </div>

    );
};


export default detail;