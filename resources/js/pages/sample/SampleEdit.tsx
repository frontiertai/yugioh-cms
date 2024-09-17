import React, { useRef } from "react";
import "../../../css/app.css";
import { User } from "./SampleIndex";

const SampleEdit = (user: User) => {
    console.log(user);
    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    return (
        <div>
            <h1>編集</h1>
            <form action={`/sample/update/${user.id}`} method="post">
                <input type="hidden" name="_token" value={csrfToken.current} />
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={user.name}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SampleEdit;
