import React from "react";
import "../../../css/app.css";
import ImgAsset from "../../components/ImgAsset";

type Prop = {
    list: User[];
};

export type User = {
    id: number;
    name: string;
    img_path: string;
};

const SampleIndex = (props: Prop) => {
    const toDetail = (id: number) => {
        console.log(id);
        location.href = `/sample/detail/${id}`;
    };

    return (
        <div>
            <a href="/sample/create">新規追加</a>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((user) => (
                        <tr key={user.id} onClick={() => toDetail(user.id)}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td><ImgAsset src={user.img_path} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SampleIndex;
