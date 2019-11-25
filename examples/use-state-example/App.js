import { render } from '/core.js'
import { StatefulCounter } from './StatefulCounter.js'

export const App = () => render`
    <div id="root">
      <h1 id="title">Counters</h1>
      ${StatefulCounter({ id: 'counter' })}
      ${StatefulCounter({ id: 'counter-1' })}
    </div>
  `
