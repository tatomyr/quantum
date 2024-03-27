import { init, render, makeAsync } from "../../index.js";
// Initialization
const { mount, rerender } = init({ greeting: "Hello World!" });
const { useAsync } = makeAsync(rerender);
// Constants
const url = "http://localhost:3000/counters/my-counter";
// Hooks
const useMyCounter = useAsync(url, () => fetch(url).then(res => res.json()), {
    expiration: 100000,
});
// UI components
const root = () => {
    const { data, status, error, fire, unwrap, getCached } = useMyCounter.call({
        value: 0,
    });
    return render `
    <div id="root">
      ${funnyWrapper("Hello Async Counter")}
      ${funnyWrapper(render `
        <button 
          style="all: unset"
          ::click=${() => {
        fire({
            optimisticData: { value: (getCached().data.value || 0) + 1 },
            mutation: async () => {
                const { value } = await fetch(url).then(res => res.json());
                await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ value: value + 1 }),
                });
            },
        });
    }}}
        >
          ${funnyWrapper("+")}
        </button>
        <span 
          id="my-counter" 
          style="
            padding: 0 10px; 
            ${status === "pending" && render `color: lightgrey;`}
          "
        >
          ${data?.value}
        </span>
        <span id="loader" style="margin: 0 4px;">
          ${status === "pending" && "💿"}
        </span>
      `)}
      ${status === "error" && funnyWrapper(error?.message)}
    </div>
  `;
};
const funnyWrapper = (child) => render `
  <div 
    style="
      border: 1px solid lime; 
      background: linear-gradient(#e66465, #9198e5);
      border-radius: 8px;
      margin: -1px 0;
      padding: 10px 20px;
      color: white;
      font-weight: bold;
    "
  >
    ${child}
  </div>
`;
mount(root);
