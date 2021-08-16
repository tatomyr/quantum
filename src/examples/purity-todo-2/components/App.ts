import {Component, render} from '../../../purity.js'
import {startup} from '../services/startup.js'
import {Header} from './Header.js'
import {InputForm} from './InputForm.js'
import {TaskList} from './TaskList.js'

startup()

const AppStyle: Component = () => render`
  <style id="root-style">
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-family: sans-serif;
      font-size: 20px;
      color: #555555;
    }

    ul {
      width: 100%;
      list-style-type: none;
      padding: 0;
    }

    #root {
      position: relative;
      width: 100%;
      max-width: 100%;
      height: 100vh;
      max-height: 100vh;
    }
  </style>
`

export const App: Component = () => render`
  <div id="root">
    ${Header()}
    ${TaskList()}
    ${InputForm()}
    ${AppStyle()}
  </div>
`
