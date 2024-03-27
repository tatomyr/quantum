import { render } from "../../index.js";
import { getState } from "../index.js";
export const view = () => render `
  <html>
    <head>
      <title>Playground View</title>
      <style>
        #error pre {
          background: red; 
          color: white; 
          padding: 16px; 
        }
      </style>
      <script type='module'>
        import {init, render} from '../index.js'

        const {mount, getState, setState} = init({err: ''})

        const ErrorView = () => render\`
          <div id='error'>
            \${getState().err && render\`
              <pre>
                \${getState().err}
              </pre>
            \`}
          </div>
        \`

        mount(ErrorView)

        window.onerror = err => {
          setState(() => ({err}))
        }
      </script>
    </head>
    <body>
      <div id='root'></div>
      <div id='error'></div>
      <script type='module'>${getState().code.replace(/"/g, "&quot;")}</script>
    </body>
  </html>
`;
