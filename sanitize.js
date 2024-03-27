export const sanitize = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
