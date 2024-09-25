import React, { useRef } from "react";
import "../../../css/app.css";
import { usePage } from "@inertiajs/react";

const SampleCreate = () => {
    const { errors } = usePage().props;
    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);
    return (
        <div>
            <h1>新規作成</h1>
            <form action="/sample/store" method="post" encType="multipart/form-data">
                <input type="hidden" name="_token" value={csrfToken.current} />
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" />
                    {errors['name'] && <p className="error-message">{errors['name']}</p>}
                </div>
                <div>
                    <input type="file" name="img_path" />
                    {errors['img_path'] && <p className="error-message">{errors['img_path']}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                <a href={route('sample')}>一覧に戻る</a>
            </div>
        </div>
    );
};

export default SampleCreate;
