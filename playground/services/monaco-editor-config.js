export function configureMonacoEditor({ domElement, defaultCode, onChange, }) {
    // Provided by loader.min.js.
    require.config({
        paths: {
            vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs",
        },
    });
    window.MonacoEnvironment = {
        getWorkerUrl: () => proxy,
    };
    const proxy = URL.createObjectURL(new Blob([
        `
            self.MonacoEnvironment = {
                baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min'
            };
            importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/base/worker/workerMain.min.js');
        `,
    ], { type: "text/javascript" }));
    require(["vs/editor/editor.main"], function () {
        const editor = monaco.editor.create(domElement, {
            value: defaultCode,
            language: "javascript",
            theme: "vs-dark",
            minimap: {
                enabled: false,
            },
            automaticLayout: true,
        });
        onChange(editor.getValue());
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        });
    });
}
