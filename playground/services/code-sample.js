export const codeSample = `import {init, render} from 'https://tatomyr.github.io/purity/index.js'

const {mount, getState, setState} = init({count: 0})

const root = () => render\`
  <div id="root">
    <pre id="counter">Counter: \${getState().count}</pre>
    <button ::click=\${() => setState(({count}) => ({count: count + 1}))}>
      Increment
    </button>
  </div>
\`

mount(root)
`;
