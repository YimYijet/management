import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { Middleware, Store } from 'redux'
import { createBrowserHistory, History } from 'history'
import StoreConfig from '@/store'
import Router from '@/containers/Router'

const history: History = createBrowserHistory()

const middleware: Middleware = routerMiddleware(history)

const store: Store = StoreConfig(middleware)

ReactDom.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById('app') as HTMLElement
)
