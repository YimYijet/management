import TestComponent from '@/components/test'
import * as TestActions from '@/actions/test'
import { IStoreState } from '@/types'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

export function mapStateToProps({ test: { name, age } }: IStoreState) {
    return {
        name,
        age
    }
}

export function mapDispatchToProps(dispatch: Dispatch<TestActions.ITestAction>) {
    ChangeName: ({ name, age }) => dispatch(TestActions.addTest({ name, age }))
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
    return { ...stateProps, ...dispatchProps, ...ownProps }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TestComponent)