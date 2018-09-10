import TestComponent from '@/components/test'
import * as TestActions from '@/actions/test'
import { IStoreState } from '@/types'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

export function mapStateToProps({ test: { name, age } }: IStoreState) {
    return {
        age,
        name,
    }
}

export function mapDispatchToProps(dispatch: Dispatch<TestActions.ITestAction>, ownProps) {
    return {
        ChangeName: (age, e) => {
            console.log(age, ownProps)
            dispatch(TestActions.addTest({ name: e.target.value, age: age }))
        },
    }
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
    return { ...stateProps, ...dispatchProps, ...ownProps, }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TestComponent)