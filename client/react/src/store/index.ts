import { createStore, Action } from 'redux'
import rootReducer from '@/reducers'

import { composeWithDevTools } from 'redux-devtools-extension'

export default () => {
    return createStore<any, Action<any>, {}, {}>(
        rootReducer,
        composeWithDevTools()
    )
}