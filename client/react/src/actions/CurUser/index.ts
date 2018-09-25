import * as CurUser from '@/constants/CurUser'
import { ICurUser } from '@/types/CurUser';

export interface ICurUserAction {
    type: CurUser.UPDATE_CURUSER
    data: ICurUser
}

export function updateCurUser(data: ICurUser): ICurUserAction {
    return {
        data,
        type: CurUser.UPDATE_CURUSER
    }
}

export function Login(data) {
    
}