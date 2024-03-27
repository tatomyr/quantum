const BASE_URL = "http://localhost:3000/items";
export const getItems = () => fetch(BASE_URL).then(res => res.json());
export const addItem = (text) => fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, checked: false }),
}).then(res => res.json());
export const toggleItem = (id, checked) => fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checked }),
}).then(res => res.json());
export const deleteItem = (id) => fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
}).then(res => res.json());
