import { RouterState } from 'react-router-redux'
import { ITest } from './Test'
import { ICurUser } from './CurUser';

export interface IStoreState {
    router?: RouterState
    test?: ITest
    curUser?: ICurUser
}
