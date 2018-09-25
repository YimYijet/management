import * as React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'
import { connect } from 'react-redux';
import { IRoute } from "@/types/router"
import Menu from '@/components/Menu'
import { IStoreState } from 'types';

function Loading(): JSX.Element {
    return (
        <Spin></Spin>
    )
}

const routeList: IRoute[] = [
    {
        path: '/',
        title: '首页',
        name: 'home',
        component: Loadable({
            loader: () => import('@/containers/Home'),
            loading: Loading
        })
    },
    {
        path: '/Test',
        title: '测试',
        name: 'test',
        component: Loadable({
            loader: () => import('@/containers/Test'),
            loading: Loading
        })
    },
    {
        path: '/Main',
        title: '主体',
        name: 'main',
        component: Loadable({
            loader: () => import('@/containers/Main'),
            loading: Loading
        })
    },
    {
        path: '/Charts',
        title: '图表',
        name: 'charts',
        component: Loadable({
            loader: () => import('@/containers/Charts'),
            loading: Loading
        })
    },
    {
        path: '/System',
        title: '系统',
        name: 'system',
        perm: true,
        component: Loadable({
            loader: () => import('@/containers/System'),
            loading: Loading
        })
    }
]

function mapStateToProps({ curUser: { resources } }: IStoreState) {
    return {
        resources,
        routeList,
    }
}

export default connect(mapStateToProps)(Menu)
