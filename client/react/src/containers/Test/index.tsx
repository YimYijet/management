import TestComponent from '@/components/Test'
import * as TestActions from '@/actions/Test'
import { ITest } from '@/types/Test'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps({ name, age }: ITest) {
    return {
        age,
        name,
    }
}

function mapDispatchToProps(dispatch: Dispatch<TestActions.ITestAction>, ownProps) {
    return {
        ChangeName: (age, e) => {
            console.log(age, e.target.value, ownProps)
            dispatch(TestActions.addTest({ name: e.target.value, age }))
        },
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return { ...stateProps, ...dispatchProps, ...ownProps, }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TestComponent)