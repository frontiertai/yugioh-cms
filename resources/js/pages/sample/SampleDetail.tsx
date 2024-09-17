import React from "react";
import '../../../css/app.css'

type Prop = {
  id: number;
}

const SampleDetail = (props: Prop) => {
    return (
        <div>
            <h1>詳細 {props.id}</h1>
        </div>
    );
}

export default SampleDetail;