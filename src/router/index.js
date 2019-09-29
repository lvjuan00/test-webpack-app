import React from 'react'
import { HashRouter, BrowserRouter, Router, Switch, Route} from 'react-router-dom'
import config from './config'
import history from '../config/history'
// console.log('history-----', history)
class RouterConfig extends React.Component{
  render() {
    return (
      <div>
        {/* <HashRouter history={history}> */}
        <HashRouter>
          <div>
            <Switch>
              {
                config.map((item) => {
                  return <Route key={item.name} path={item.path} exact component={item.component} />
                })
              }
            </Switch>
          </div>
        </HashRouter>
      </div>
    )
  }
}
export default RouterConfig
