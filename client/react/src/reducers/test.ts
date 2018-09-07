import * as Test from '@/constants/test'
import { ITest } from '@/types/test'
import { ITestAction } from '@/actions/test'

const initState = {
    name: 'rick',
    age: 70
}

export function testReducer(state: ITest = initState, action: ITestAction): ITest {
    switch (action.type) {
        case Test.ADD_TEST:
            return {
                name: action.name,
                age: action.age
            } 
    }
    return state
}