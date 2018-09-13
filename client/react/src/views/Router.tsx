import * as React from 'react'
// import { Router, Link, Route } from 'react-router-dom'
import { History } from 'history'
import Menu from '@/components/Menu'
import Home from '@/views/Home'
import Test from '@/containers/test'

interface IProps {
    history: History
}

const linkList = [
    {
        path: '/',
        title: '首页'
    },
    {
        path: '/Test',
        title: '测试'
    }
], routeList = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/Test',
        component: Test
    }
]

export default class RootRouter extends React.Component<IProps> {

    constructor(props) {
        super(props)
    }

    render() {
        const { history } = this.props
        return (
            <Menu history={history} linkList={linkList} routeList={routeList}/>
        )
    }
}
