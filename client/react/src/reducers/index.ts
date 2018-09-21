import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { IStoreState } from '@/types'
import { testReducer } from './Test'
import { curUserReducer } from './CurUser/index';

export default combineReducers<IStoreState>({
    router: routerReducer,
    test: testReducer,
    curUser: curUserReducer
})
