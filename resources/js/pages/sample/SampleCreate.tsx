import React, { useRef } from "react";
import "../../../css/app.css";
import { useForm, usePage } from "@inertiajs/react";

export type Inputs = {
    name: string;
    img_path: File | null;
};

const SampleCreate = () => {
    // const { errors } = usePage().props;
    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    const { data, setData, post, processing, errors } = useForm<Inputs>({
        name: "",
        img_path: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();//ここがわからん
        post(route("sample.store", { formForceData: true }));
    };

    return (
        <div>
            <h1>新規作成</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="_token" value={csrfToken.current} />
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && (
                        <p className="error-message">{errors.name}</p>
                    )}
                </div>
                <div>
                    <input
                        type="file"
                        onChange={(e) =>
                            setData("img_path", e.target.files?.[0] || null)
                        }
                    />
                    {errors.img_path && (
                        <p className="error-message">{errors.img_path}</p>
                    )}
                </div>
                <button type="submit" disabled={processing}>
                    {processing ? "Submitting..." : "Submit"}
                </button>
            </form>
            <div>
                <a href={route("sample")}>一覧に戻る</a>
            </div>
        </div>
    );
};

export default SampleCreate;
