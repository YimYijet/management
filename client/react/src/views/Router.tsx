import * as React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'
import { IRoute } from "@/types/router"
import Menu from '@/components/Menu'

interface IProps {
}

function Loading(): JSX.Element {
    return (
        <Spin></Spin>
    )
}

const routeList: IRoute[] = [
    {
        path: '/',
        title: '首页',
        component: Loadable({
            loader: () => import('@/views/Home'),
            loading: Loading
        })
    },
    {
        path: '/Test',
        title: '测试',
        component: Loadable({
            loader: () => import('@/containers/test'),
            loading: Loading
        })   
    },
    {
        path: '/Main',
        title: '主体',
        component: Loadable({
            loader: () => import('@/views/Main'),
            loading: Loading
        })
    },
    {
        path: '/Charts',
        title: '图表',
        component: Loadable({
            loader: () => import('@/views/Charts'),
            loading: Loading
        })
    },
    {
        path: '/System',
        title: '系统',
        component: Loadable({
            loader: () => import('@/views/System'),
            loading: Loading
        })
    }
]

export default class RootRouter extends React.Component<IProps> {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Menu routeList={routeList}/>
        )
    }
}
