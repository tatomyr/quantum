export function download(filename, text) {
    const a = document.createElement("a");
    a.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(text)}`);
    a.setAttribute("download", filename);
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
export const textFileReader = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.onerror = () => {
        reject(reader.error);
    };
    reader.readAsText(file);
});
