import * as React from 'react'
import { Router, Link, Route, Switch } from 'react-router-dom'
import { History } from 'history'
import { ILink, IRoute } from '@/types/router'

interface IProps {
    history: History
    linkList: ILink[]
    routeList: IRoute[]
}

export default class Menu extends React.Component<IProps> {

    constructor(props) {
        super(props)
    }

    render() {
        const { history, linkList, routeList } = this.props,
        linkGroup = linkList.map((item) => {
            return (
                <li>
                    <Link to={`#${item.path}`}>{item.title}</Link>
                </li>
            )
        }),
        routeGroup = routeList.map((item) => {
            return (
                <Route path={item.path} component={item.component}/>
            )
        })

        return (
            <Router history={history}>
                <div>
                    <ul>
                        {...linkGroup}
                    </ul>
                    <Switch>
                        {...routeGroup}
                    </Switch>
                </div>
            </Router>
        )
    }
}