import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { testReducer } from './test'
import { IStoreState } from '@/types'

export default combineReducers<IStoreState>({
    router: routerReducer,
    test: testReducer,
})
