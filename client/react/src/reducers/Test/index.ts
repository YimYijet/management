import * as Test from '@/constants/Test'
import { ITest } from '@/types/Test'
import { ITestAction } from '@/actions/Test'

const initState: ITest = {
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
