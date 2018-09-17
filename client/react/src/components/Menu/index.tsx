import * as React from 'react'
import { Layout, Menu as Nav } from 'antd'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'
import { IRoute } from '@/types/router'
import './index.scss'

interface IProps {
    routeList: IRoute[]
}

interface IState {
    current: string
}

export default class Menu extends React.Component<IProps> {

    state: IState

    constructor(props: IProps) {
        super(props)
        this.state = {
            current: props.routeList.length ? props.routeList[0].name : ''
        }
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        })
    }

    render() {
        const { routeList }: IProps = this.props, linkGroup = [], routeGroup = []

        routeList.forEach((item, index) => {
            linkGroup.push((
                <Nav.Item key={item.name} >
                    <Link to={item.path} replace>{item.title}</Link>
                </Nav.Item>
            ))
            routeGroup.push((
                <Route exact={!index} key={item.name} path={item.path} component={item.component} />
            ))
        })
    
        return (
            <HashRouter>
                <Layout className={'layout'}>
                    <Layout.Header className={'header'}>
                        <Nav mode="horizontal" selectedKeys={[this.state.current]} className={'nav'} onClick={(e) => this.handleClick(e)}>
                            {...linkGroup}
                        </Nav>
                    </Layout.Header>
                    <Layout.Content>
                        <Switch>
                            {...routeGroup}
                        </Switch>
                    </Layout.Content>
                </Layout>
            </HashRouter>
        )
    }
}