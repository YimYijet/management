import * as React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import { IRoute } from "@/types/router"
import Menu from '@/components/Menu'
import { IStoreState } from '@/types'

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

interface IStoreProps {
    resources?: object
}

interface IProps extends IStoreProps {

}

@inject((store: IStoreState): IStoreProps => {
    const { resources } = store.curUserStore
    return { resources }
})
@observer
class Router extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    render() {
        console.log(this.props.resources)
        const { resources } = this.props
        return (
            <Menu resources={resources} routeList={routeList}/>
        )
    }
}

export default Router