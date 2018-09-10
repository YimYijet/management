import * as Test from '@/constants/test'
import { ITest } from '@/types/test'
import { ITestAction } from '@/actions/test'

const initState = {
    name: 'rick',
    age: 70,
}

export function testReducer(state: ITest = initState, { type, name, age }: ITestAction): ITest {
    switch (type) {
        case Test.ADD_TEST:
            return {
                name,
                age,
            } 
    }
    return state
}
