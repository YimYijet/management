import * as CurUser from '@/constants/CurUser'
import { ICurUser } from "@/types/CurUser";
import { ICurUserAction } from '@/actions/CurUser';

const initState: ICurUser = {
    userId: '',
    resources: {},
    token: '',
    role: {}
}

export function curUserReducer(state: ICurUser = initState, action: ICurUserAction): ICurUser {
    switch (action.type) {
        case CurUser.UPDATE_CURUSER:
            return Object.assign({}, state, action.data)
    }
    return state
}