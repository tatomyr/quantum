const items = [
    { id: 1, name: "Andrew" },
    { id: 3, name: "Bartolomew" },
    { id: 4, name: "Catalyna" },
    { id: 6, name: "Donald" },
    { id: 7, name: "Fernando" },
    { id: 5, name: "Gregory" },
    { id: 8, name: "Houston" },
    { id: 2, name: "John" },
    { id: 9, name: "Katherine" },
    { id: 11, name: "Mark" },
    { id: 12, name: "Orest" },
    { id: 14, name: "Philipp" },
    { id: 15, name: "Quentin" },
    { id: 13, name: "Victor" },
    { id: 10, name: "Xenia" },
];
const byName = (request) => ({ name }) => name.toLowerCase().search(request.toLowerCase()) !== -1;
export const fakeEndpoint = (request) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (!/^[a-zA-Z]*$/.test(request))
            reject(new Error("Fake error"));
        resolve(items.filter(byName(request)));
    }, Math.ceil((Math.random() + Math.random() + Math.random()) * 1000));
});
export const idEquals = (externalId) => ({ id }) => id === externalId;
export const idIsNotEqual = (externalId) => ({ id }) => id !== externalId;
