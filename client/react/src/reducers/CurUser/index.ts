import { ICurUser } from "@/types/CurUser";

const initState: ICurUser = {
    userId: '',
    resources: [],
    token: '',
    role: ''
}

export function curUserReducer(state: ICurUser = initState): ICurUser {
    return state
}