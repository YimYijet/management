import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import StoreConfig from '@/store'
import Router from '@/views/Router'

const history = createHistory()

const middleware = routerMiddleware(history)

const store = StoreConfig(middleware)

ReactDom.render(
    <Provider store={store}>
        <Router history={history}/>
    </Provider>,
    document.getElementById('app') as HTMLElement
)
