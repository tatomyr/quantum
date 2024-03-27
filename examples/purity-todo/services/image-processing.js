export const keepRatio = ({ width, height }) => (size) => ((width <= size || height <= size) && {
    resizeWidth: width,
    resizeHeight: height,
}) ||
    (width > height && {
        resizeWidth: Math.round((size * width) / height),
        resizeHeight: size,
    }) || {
    resizeWidth: size,
    resizeHeight: Math.round((size * height) / width),
};
export const cropSquare = ({ width, height, }) => {
    const minSize = Math.min(width, height);
    return [
        Math.round((width - minSize) / 2),
        Math.round((height - minSize) / 2),
        minSize,
        minSize,
    ];
};
export const getImgSrc = (img) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, img.width, img.height);
    return ctx?.canvas.toDataURL("image/png", 1);
};
/*
 * Safari and Edge polyfill for createImageBitmap
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap
 *
 * Support source image types Blob and ImageData.
 *
 * From: https://dev.to/nektro/createimagebitmap-polyfill-for-safari-and-edge-228
 * Updated by Yoan Tournade <yoan@ytotech.com>
 * Updated by Andrew Tatomyr
 */
if (!("createImageBitmap" in window)) {
    ;
    window.createImageBitmap = async function (data) {
        return new Promise((resolve, reject) => {
            let dataURL;
            if (data instanceof Blob) {
                dataURL = URL.createObjectURL(data);
            }
            else if (data instanceof ImageData || data instanceof Image) {
                console.log(data, data instanceof ImageData, data instanceof Image);
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = data.width;
                canvas.height = data.height;
                if (data instanceof ImageData) {
                    ctx?.putImageData(data, 0, 0);
                }
                else if (data instanceof Image) {
                    ctx?.drawImage(data, 0, 0);
                }
                dataURL = canvas.toDataURL();
            }
            else {
                throw new Error("createImageBitmap does not handle the provided image source type");
            }
            const img = document.createElement("img");
            img.addEventListener("load", function () {
                resolve(this);
            });
            img.src = dataURL;
        });
    };
}
