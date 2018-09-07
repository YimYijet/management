import * as Test from '@/constants/test'
import { ITest } from '@/types/test'

export interface ITestAction {
    type: Test.ADD_TEST,
    name: string,
    age?: number
}

export function addTest({ name, age }: ITest): ITestAction {
    return {
        type: Test.ADD_TEST,
        name: name,
        age: age
    }
}