import { createStore, Action, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { Middleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { createBrowserHistory, History } from 'history'
import { IStoreState } from '@/types'
import rootReducer from '@/reducers'

const history: History = createBrowserHistory(),
    historyMiddleware: Middleware = routerMiddleware(history)

export default createStore<IStoreState, Action<any>, {}, {}>(
    rootReducer,
    applyMiddleware(historyMiddleware, thunkMiddleware, logger),
)
