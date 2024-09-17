import React from "react";

type ImgAssetProps = {
    src: string;
    alt?: string | undefined;
    className?: string | undefined;
};

const ImgAsset = ({ src, alt, className }: ImgAssetProps) => {
    return (
        <img src={`/storage/${src}`} alt={alt} className={className} width={100}/>
    );
}

export default ImgAsset;