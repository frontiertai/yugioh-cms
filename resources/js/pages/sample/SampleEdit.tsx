import React, { useRef } from "react";
import "../../../css/app.css";
import { User } from "./SampleIndex";
import { useForm, usePage } from "@inertiajs/react";

type DetailData = {
    id: number;
    name: string;
    img_path: File | null;
};

const SampleEdit = (detail: DetailData) => {
    // const { errors } = usePage().props;
    // CSRFトークンを取得
    const metaCsrfToken = document.querySelector(
        "meta[name='csrf-token']"
    ) as HTMLMetaElement;
    const csrfToken = useRef<string>(metaCsrfToken.content);

    const { data, setData, post, processing, errors } = useForm<DetailData>({
        id: detail.id,
        name: detail.name,
        img_path: detail.img_path,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("sample.update", { id: data.id }), { forceFormData: true });
    };

    return (
        <div>
            <h1>編集</h1>
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
                    {processing ? "Editing..." : "Edit"}
                </button>
            </form>
            <div>
                <a href={route("sample")}>一覧に戻る</a>
            </div>
        </div>
    );
};

export default SampleEdit;
