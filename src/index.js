import React from 'react'
import ReactDom from 'react-dom'
import RouterConfig from './router'
import { Provider } from 'react-redux'
import store from './store'
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    )
  }
}
ReactDom.render(<App />, document.getElementById('root'))