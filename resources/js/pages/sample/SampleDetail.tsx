import React from "react";
import "../../../css/app.css";
import ImgAsset from "../../components/ImgAsset";

type Prop = {
    id: number;
    name: string;
    img_path: string;
};

const SampleDetail = (props: Prop) => {
    return (
        <div>
            <h1>詳細 {props.id}</h1>
            <div>
                <p>{props.name}</p>
                <ImgAsset src={props.img_path} />
            </div>
            <div>
                <a href={route('sample')}>一覧に戻る</a>
            </div>
            <div>
                <a href={`/sample/edit/${props.id}`}>編集</a>
            </div>
        </div>
    );
};

export default SampleDetail;
