import React from "react";
import '../../../css/app.css'

type Prop = {
  list: User[];
};

type User = {
    id: number;
    name: string;
};

const SampleIndex = (props: Prop) => {
    const toDetail = (id: number) => {
        console.log(id);
        location.href = `/sample/detail/${id}`;
    }

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
              <tr key={user.id}  onClick={() => toDetail(user.id)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
};

export default SampleIndex;