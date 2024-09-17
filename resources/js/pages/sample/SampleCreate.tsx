import React, { useRef } from "react";
import "../../../css/app.css";

const SampleCreate = () => {
    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    return (
        <div>
            <h1>新規作成</h1>
            <form action="/sample/store" method="post">
                <input type="hidden" name="_token" value={csrfToken.current} />
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SampleCreate;
