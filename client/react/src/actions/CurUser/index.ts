import * as CurUser from '@/constants/CurUser'
import { ICurUser } from '@/types/CurUser';
import axios from 'axios'

export interface ICurUserAction {
    type: CurUser.UPDATE_CURUSER
    data: ICurUser
}


// export interface ICurUserAction {
//     type: CurUser.UPDATE_CURUSER
//     data: ICurUser
// }
export function requestCurUser(data: ICurUser): ICurUserAction {
    return {
        data,
        type: CurUser.UPDATE_CURUSER
    }
}

// export function Login(): Function {
//     return (dispatch) => {
//         axios.get('/users').then((res) => {
//             console.log(res)
//             dispatch(updateCurUser(res.data as ICurUser))
//         })
//     }
// }