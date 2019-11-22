import { htmx } from '/htmx.js'

export const Button = ({ parentId, action, caption, handleClick }) =>
  htmx({})`
  <button
    id="${parentId}-${action}-button"
    data-counter="${action}"
    ::click=${handleClick}
  >
    ${caption}
  </button>
`