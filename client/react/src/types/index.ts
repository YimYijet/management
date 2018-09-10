import { RouterState } from 'react-router-redux'
import { ITest } from './test'

export interface IStoreState {
    router?: RouterState
    test?: ITest
}
