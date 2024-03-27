import { mount } from "./app.js";
import { root } from "./components/root.js";
import { env } from "./env.js";
mount(root);
if ("serviceWorker" in navigator && env === "prod") {
    navigator.serviceWorker
        .register("./purity-todo.sw.js")
        .then(registration => {
        console.info("[purity-todo.sw.js] Registration successful, scope is:", registration.scope);
    })
        .catch(err => {
        console.info("[purity-todo.sw.js] Service worker registration failed, error:", err);
    });
}
