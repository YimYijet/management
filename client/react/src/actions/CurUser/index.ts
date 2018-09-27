import * as CurUser from '@/constants/CurUser'
import { ICurUser } from '@/types/CurUser';
import request from '@/lib/request'

export interface ICurUserAction {
    type: CurUser.UPDATE_CURUSER
    data: ICurUser
}

export function Login(data): Function {
    return (dispatch, getState) => {
        return request.post('/login', data).then((res) => {
            dispatch({ type: CurUser.UPDATE_CURUSER, data: res.data.content } as ICurUserAction)
        })
    }
}