import React, { useRef } from "react";
import "../../../css/app.css";
import { User } from "./SampleIndex";

const SampleEdit = (user: User) => {
    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    return (
        <div>
            <h1>編集</h1>
            <form action={`/sample/update/${user.id}`} method="post" encType="multipart/form-data">
                <input type="hidden" name="_token" value={csrfToken.current} />
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={user.name} />
                </div>
                <div>
                    <input type="file" name="img_path" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SampleEdit;
