import React, { useRef } from "react";
import { Magic } from "./cardList";
import { useForm } from "@inertiajs/react";
import { CardFactory } from "../../viewModel/Card";
import { route } from "ziggy-js";
import MagicType from "../../components/MagicType";
import ImgAsset from "../../components/ImgAsset";
import "../../../css/app.css";




type Props={
    props:Magic
}


const edit=(props:Props)=>{

    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);


    const editData = CardFactory.createEntity(props.props);


    //魔法カードのuseForm
    const { data: magicdata, setData: setMagicData, post: magicPost, errors: magicErros } = useForm<Magic>({

        id: editData.get_id(),
        card_type_id: editData.get_card_type_id(),
        name: editData.get_name(),
        magic_type_id: editData.get_type_id(),
        img_path: null,
        effectText: editData.get_effectText(),
    })

     //魔法
     const MagicHandleSubmit = (e: React.FormEvent) => {
        console.log(e);
        e.preventDefault();

        magicPost(route('magic.update',{id:editData.get_id()}), { forceFormData: true });

    }


    const setMagicType = (type: number) => setMagicData("magic_type_id", type);


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
                    <button onClick={()=>toDetail(editData.get_id(),editData.get_card_type_id())} className="text-xl bg-blue-900 rounded-md px-2 py-2 ">
                        詳細へ戻る
                    </button>
                    <a href={route('home')} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                        カード一覧に戻る
                    </a>
                   
                </div>
            </div>



            <div className="flex flex-col items-center justify-center space-y-20">

        
            <div className="text-2xl">魔法カードの性能を入力してください</div>
            <div>

                <form  onSubmit={MagicHandleSubmit} encType="multipart/form-data" className="flex flex-col items-center justify-center space-y-4 border border-blue-900 rounded-md p-2 w-[900px]  h-[800px]">
                    <input type="hidden" name="_token" value={csrfToken.current} />

                    <div className="flex space-x-8">
                        <label>マジック名を入力</label>
                        <input type="text" value={magicdata.name} onChange={(e) => setMagicData('name', e.target.value)} className="border border-black rounded-sm" />
                        {magicErros['name'] && <p className="error-message">{magicErros['name']}</p>}
                    </div>
                    <div className="flex space-x-8">
                        <MagicType TypehandleChange={setMagicType} selectedType={magicdata.card_type_id} />

                        {magicErros['magic_type_id'] && <p className="error-message">{magicErros['magic_type_id']}</p>}
                    </div>
                    <div >
                        <label>画像を入力</label>
                        <input type="file" onChange={(e) => setMagicData("img_path", e.target.files?.[0] || null)} />
                        {magicErros['img_path'] && <p className="error-message">{magicErros['img_path']}</p>}
                        <ImgAsset src={editData.get_img_path()} />
                    </div>
                    <div className="flex space-x-8">
                        <label>必要であれば詳細を教えてください</label>
                        <input className="w-48 h-12x border  border-black rounded-sm " type="text" value={magicdata.effectText} onChange={(e) => setMagicData('effectText', e.target.value)} />
                        {magicErros['effectText']&&<p className="error-message text-sm">{magicErros['effectText']}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-blue-900 text-white py-2 px-2 rounded-md " type='submit'>登録する</button>

                        </div>


                </form>

            </div>
            </div>
        
    </div>
    )





};

export default edit;