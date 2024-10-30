import React, { useRef } from "react";
import { Trap } from "./cardList";
import { CardFactory } from "../../viewModel/Card";
import { route } from "ziggy-js";
import TrapType from "../../components/TrapType";
import ImgAsset from "../../components/ImgAsset";
import { useForm } from "@inertiajs/react";
import "../../../css/app.css";

type Props={
    props:Trap;
}


const edit=(props:Props)=>{


     // CSRFトークンを取得
     const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);


    const editData = CardFactory.createEntity(props.props);


     //罠カードのuseForm
     const { data: trapdata, setData: setTrapData, post: trapPost, errors: trapErros } = useForm<Trap>({

        id: editData.get_id(),
        card_type_id: editData.get_card_type_id(),
        name: editData.get_name(),
        trap_type_id: editData.get_type_id(),
        img_path: null,
        effectText: editData.get_effectText(),

     })

      //罠
    const TrapHandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        trapPost(route('trap.update',{id:editData.get_id()}), { forceFormData: true });

    }


    const setTrapType = (type: number) => setTrapData("trap_type_id", type);

    const toDetail=(id,type)=>{
        console.log(id)
        console.log(type)
        location.href=`/home/detail/${id}/${type}`

    };

    return (
        <div className="flex flex-col space-y-20">
             <div className="flex h-24 bg-black text-white text-2xl justify-around px-4">
                <div className="flex items-center ">
                    <div>カード管理システム</div>

                </div>
                    
                <div  className="flex items-center space-x-4">
                    <button onClick={()=>toDetail(editData.get_id(),editData.get_card_type_id())} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                        詳細へ戻る
                    </button>
                    <a href={route('home')} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                        カード一覧に戻る
                    </a>
                   
                </div>
            </div>


            <div className="flex flex-col items-center justify-center space-y-20">


        

            <div className="text-2xl">トラップカードの性能を入力してください</div>

            <div>

                <form onSubmit={TrapHandleSubmit} encType="multipart/form-data"  className="flex flex-col items-center justify-center space-y-4 border border-yellow-400 rounded-md p-4 w-[900px]  h-[800px]">
                    <input type="hidden" name="_token" value={csrfToken.current} />

                    <div className="flex space-x-8">
                        <label>罠の名前を入力</label>
                        <input type="text" value={trapdata.name} onChange={(e) => setTrapData('name', e.target.value)} className="border border-black rounded-sm"  />
                        {trapErros['name'] && <p className="error-message">{trapErros['name']}</p>}
                    </div>
                    <div className="flex space-x-8">
                        <TrapType TypehandleChange={setTrapType} selectedType={trapdata.trap_type_id} />
                        {trapErros['trap_type_id'] && <p className="error-message">{trapErros['trap_type_id']}</p>}
                    </div>
                    <div >

                        <label>画像を入力</label>
                        <input type="file" onChange={(e) => setTrapData("img_path", e.target.files?.[0] || null)} />
                        {trapErros['img_path'] && <p className="error-message">{trapErros['img_path']}</p>}
                        <ImgAsset src={editData.get_img_path()} />
                    </div>
                    <div className="flex space-x-8">
                        <label>必要であれば詳細を教えてください</label>
                        <input className="w-48 h-12x border  border-black rounded-sm " type="text" value={trapdata.effectText} onChange={(e) => setTrapData('effectText', e.target.value)} />
                        {trapErros['effectText']&&<p className="error-message text-sm">{trapErros['effectText']}</p>}
                    </div>


                    <div className="flex justify-end">
                            <button className="bg-yellow-400 text-white py-2 px-2 rounded-md " type='submit'>登録する</button>
                            
                     </div>


                </form>

            </div>
            </div>

        

    </div>
    )


};

export default edit;