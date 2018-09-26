import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { Middleware, Store } from 'redux'
import { createBrowserHistory, History } from 'history'
import thunkMiddleware from 'redux-thunk'
import StoreConfig from '@/store'
import Router from '@/containers/Router'

const history: History = createBrowserHistory()

const historyMiddleware: Middleware = routerMiddleware(history)

const store: Store = StoreConfig([historyMiddleware, thunkMiddleware])

ReactDom.render(
    <Provider store={store}>
        <Router history={store.getState()}/>
    </Provider>,
    document.getElementById('app') as HTMLElement
)
