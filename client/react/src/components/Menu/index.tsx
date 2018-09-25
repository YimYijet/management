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

const Header = Layout.Header, Content = Layout.Content

export default class Menu extends React.Component<IProps> {

    public state: IState = {
        current: this.props.routeList.length ? this.props.routeList[0].name : ''
    }

    constructor(props: IProps) {
        super(props)
    }

    public handleClick(e) {
        this.setState({
            current: e.key,
        })
    }

    public componentWillMount() {
        const { routeList } = this.props, curRoute = routeList.find((item) => {
            return item.path == `/${location.hash.split('/')[1]}`
        })
        this.setState((preState: IState, props: IProps) => ({
            current: curRoute ? curRoute.name : preState.current
        }))
    }

    public render() {
        const { routeList }: IProps = this.props, linkGroup = [], routeGroup = []

        routeList.forEach((item, index) => {
            linkGroup.push((
                <Nav.Item key={item.name} >
                    <Link to={item.path} replace>{item.title}</Link>
                </Nav.Item>
            ))
            routeGroup.push((
                <Route exact key={item.name} path={item.path} component={item.component} />
            ))
        })

        return (
            <HashRouter>
                <Layout className={'layout'}>
                    <Header className={'header'}>
                        <Nav
                            mode='horizontal'
                            selectedKeys={[this.state.current]}
                            className={'nav'}
                            onClick={(e) => this.handleClick(e)}
                        >{...linkGroup}
                        </Nav>
                    </Header>
                    <Content>
                        <Switch>
                            {...routeGroup}
                        </Switch>
                    </Content>
                </Layout>
            </HashRouter>
        )
    }
}
