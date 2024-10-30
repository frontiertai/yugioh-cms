import React, { useRef } from "react";
import { Monster } from "./cardList";
import MonsterAttribute from "../../components/MonsterAttribute";
import MonsterType from "../../components/Monstertype";
import ImgAsset from "../../components/ImgAsset";
import { useForm } from "@inertiajs/react";
import { CardFactory } from "../../viewModel/Card";
import { route } from "ziggy-js";
import "../../../css/app.css";

type Props = {
    props: Monster;
}


const edit = (props: Props) => {

    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    const editData = CardFactory.createEntity(props.props)

    console.log(editData);

    const { data, setData, post, errors } = useForm<Monster>({

        id: editData.get_id(),
        card_type_id: editData.get_card_type_id(),
        name: editData.get_name(),
        attack: editData.get_attack(),
        defense: editData.get_defense(),
        monster_attribute_id: editData.get_monster_attribute_id(),
        level: editData.get_level(),
        monster_type_id: editData.get_type_id(),
        img_path: null,
        effectText: editData.get_effectText(),

    });

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('monster.update', { id: editData.get_id() }), { forceFormData: true });

    }


    //選択バーの状態更新
    const setAttribute = (attribute: number) => setData("monster_attribute_id", attribute);
    const setType = (type: number) => setData("monster_type_id", type);

    const toDetail = (id, type) => {
        console.log(id)
        console.log(type)
        location.href = `/home/detail/${id}/${type}`

    };



    return (
        <div className="flex flex-col space-y-20">
            <div className="flex h-24 bg-black text-white text-2xl justify-around px-4">
                <div className="flex items-center ">
                    <div>カード管理システム</div>

                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={() => toDetail(editData.get_id(), editData.get_card_type_id())} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                        詳細へ戻る
                    </button>
                    <a href={route('home')} className="flex items-center justify-center text-sm  bg-blue-600 rounded-md px-2 py-2 w-[160px] h-[50px]">
                        カード一覧に戻る
                    </a>

                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-20">

                <div className="text-2xl">モンスターの性能を入力してください</div>
                <div>
                    <form onSubmit={HandleSubmit} encType="multipart/form-data" className="flex flex-col items-center justify-center space-y-4 border border-red-600 rounded-md p-4 w-[900px]  h-[800px]" >
                        <input type="hidden" name="_token" value={csrfToken.current} />

                        <div className="flex space-x-8">
                            <label>モンスター名を入力</label>
                            <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="border border-black rounded-sm" />
                            {errors['name'] && <p className="error-message text-sm">{errors['name']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <label>攻撃力を入力</label>
                            <input type='number' value={data.attack} onChange={(e) => setData('attack', parseInt(e.target.value))} className="border border-black rounded-sm" />
                            {errors['attack'] && <p className="error-message text-sm">{errors['attack']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <label>防御力を入力</label>
                            <input type='number' value={data.defense} onChange={(e) => setData('defense', parseInt(e.target.value))} className="border border-black rounded-sm" />
                            {errors['defense'] && <p className="error-message text-sm">{errors['defense']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <MonsterAttribute AttributehandleChange={setAttribute} selectedAttribute={data.monster_attribute_id} />
                            {errors['monster_attribute_id'] && <p className="error-message text-sm">{errors['monster_attribute_id']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <label>レベルを入力</label>
                            <input type='number' value={data.level} onChange={(e) => setData('level', parseInt(e.target.value))} className="border border-black rounded-sm" />
                            {errors['level'] && <p className="error-message text-sm">{errors['level']}</p>}
                        </div>
                        <div className="flex space-x-8">
                            <MonsterType TypehandleChange={setType} selectedType={data.monster_type_id} />
                            {errors['monster_type_id'] && <p className="error-message text-sm">{errors['monster_type_id']}</p>}
                        </div>
                        <div>

                            <label>画像を入力</label>
                            <input type="file" onChange={(e) => setData("img_path", e.target.files?.[0] || null)} />
                            {errors['img_path'] && <p className="error-message text-sm">{errors['img_path']}</p>}
                            <ImgAsset src={editData.get_img_path()} />

                        </div>
                        <div className="flex space-x-8">
                            <label>必要であれば詳細を教えてください</label>
                            <input className="w-48 h-12x border  border-black rounded-sm " type="text" value={data.effectText} onChange={(e) => setData('effectText', e.target.value)} />
                            {errors['effectText']&&<p className="error-message text-sm">{errors['effectText']}</p>}
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-red-600 text-white py-2 px-2 rounded-md " type='submit'>登録する</button>
                        </div>

                    </form>

                </div>
            </div>


        </div>
    )



}

export default edit;