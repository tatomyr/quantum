import { render } from '../../../src/purity.js';
import { useState } from './useState.js';
import { createOnMount } from './onMount.js';
import { setState } from '../app.js';
const onMount = createOnMount();
let state = { count: 0 };
export const StatefulCounter = ({ id }) => {
    let setCount = useState(state);
    onMount(async () => {
        setState(() => ({ spinner: true }));
        try {
            const res = await fetch('http://localhost:3000/counter');
            if (!res.ok)
                throw res;
            const { count } = await res.json();
            setCount({ count });
        }
        catch (err) {
            console.log({ err });
        }
        finally {
            setState(() => ({ spinner: false }));
        }
    });
    const saveCount = async () => {
        setState(() => ({ spinner: true }));
        await fetch('http://localhost:3000/counter', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ count: state.count }),
        }).catch(err => alert(err.message));
        setState(() => ({ spinner: false }));
    };
    return render `
    <h1 id="title">Counter</h1>
    <pre id="${id}-count">${state.count}</pre>

    <button
      id="${id}-inc-button"
      data-counter="inc"
      ::click=${() => {
        setCount({ count: state.count + 1 });
    }}
    >
      Increment
    </button>
    <button
      id="${id}-dec-button"
      data-counter="dec"
      ::click=${() => {
        setCount({ count: state.count - 1 });
    }}
    >
      Decrement
    </button>
    <button
      id="${id}-reset-button"
      data-counter="reset"
      ::click=${() => {
        setCount({ count: 0 });
    }}
    >
      Reset
    </button>
    <button ::click=${saveCount}>Save</button>
  `;
};
