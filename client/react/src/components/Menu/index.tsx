import * as React from 'react'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'
import { IRoute } from '@/types/router'

interface IProps {
    routeList: IRoute[]
}

export default class Menu extends React.Component<IProps> {

    constructor(props) {
        super(props)
    }

    render() {
        const { routeList }: IProps = this.props, linkGroup = [], routeGroup = []

        routeList.forEach((item, index) => {
            linkGroup.push((
                <li key={index}>
                    <Link to={item.path}>{item.title}</Link>
                </li>
            ))
            routeGroup.push((
                <Route exact={!index} key={index} path={item.path} component={item.component} />
            ))
        })

        return (
            <HashRouter>
                <div>
                    <ul>
                        {...linkGroup}
                    </ul>
                    <Switch>
                        {...routeGroup}
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}