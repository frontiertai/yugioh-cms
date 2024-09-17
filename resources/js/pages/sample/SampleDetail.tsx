import React from "react";
import "../../../css/app.css";

type Prop = {
    id: number;
};

const SampleDetail = (props: Prop) => {
    return (
        <div>
            <h1>詳細 {props.id}</h1>
            <div>
                <a href="/sample">一覧に戻る</a>
            </div>
            <div>
                <a href={`/sample/edit/${props.id}`}>編集</a>
            </div>
        </div>
    );
};

export default SampleDetail;
