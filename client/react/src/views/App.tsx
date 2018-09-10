import * as React from 'react'
import { Router, Link, Route } from 'react-router-dom'
import { History } from 'history'
import Test from '@/containers/test'

interface IProps {
    history: History
}

export default class RootRouter extends React.Component<IProps> {

    constructor(props) {
        super(props)
    }

    render() {
        const { history } = this.props
        return (
            <Router history={history}>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/test">About</Link>
                        </li>
                    </ul>
                    <Route path="/" exact render={() => (
                        <h1>hello</h1>
                    )}/>
                    <Route path="/test" component={Test}/>
                </div>
            </Router>
        )
    }
}
