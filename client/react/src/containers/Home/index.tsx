import * as React from 'react'
import { Dispatch } from 'redux'
import Login from './Login'
import * as CurUserAction from '@/actions/CurUser'
import * as CurUser from '@/constants/CurUser'
import { ICurUser } from '@/types/CurUser'

interface IProps {
    
}

// function mapStateToProps() {
//     return {}
// }

// function mapDispatchToProps(dispatch: Dispatch<CurUserAction.ICurUserAction>) {
//     return {
//         login: () => {
//             dispatch(CurUserAction.Login())
//         }
//     }
// }

export default class Home extends React.Component<IProps> {
    render() {
        return (
            <h1>Home</h1>
        )
    }
}