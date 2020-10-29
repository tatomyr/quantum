import {render} from '../../../purity.js'
import {debounce} from '../../../debounce.js'
import {setState} from '../app.js'
import {SuggestionsList} from './SuggestionsList.js'
import {ErrorBanner} from './ErrorBanner.js'
import {Spinner} from './Spinner.js'
import {ChosenItems} from './ChosenItems.js'
import {fakeEndpoint} from '../helpers.js'

const handleInput = debounce(async (e: Event) => {
  const query = (e.target as HTMLInputElement).value
  if (query) {
    setState(() => ({isLoading: true}))
    try {
      const items = await fakeEndpoint(query)
      setState(() => ({items}))
    } catch (err) {
      setState(() => ({error: err.message}))
    } finally {
      setState(() => ({isLoading: false}))
    }
  }
}, 500)

export const Root = () => render`
  <div id="root">
    ${ChosenItems()}
    <input
      placeholder="Search query"
      ::input=${handleInput}
    />
    ${Spinner()}
    ${SuggestionsList()}
    ${ErrorBanner()}
  </div>
`