import { createStore, Action, applyMiddleware } from 'redux'
import { IStoreState } from '@/types'
import rootReducer from '@/reducers'

export default (middleware) => {
    return createStore<IStoreState, Action<any>, {}, {}>(
        rootReducer,
        applyMiddleware(middleware),
    )
}
