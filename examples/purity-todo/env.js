export const env = window.location.origin === "http://localhost:8085"
    ? "ci"
    : window.location.protocol === "http:"
        ? "dev"
        : "prod";
console.log("Environment:", env);
