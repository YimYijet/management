import * as React from 'react'
import Loadable from 'react-loadable'

export interface IRoute {
    path: string
    title: string
    name: string
    perm?: boolean
    component: (React.ComponentClass<{}, any> & Loadable.LoadableComponent) | (React.StatelessComponent<{}> & Loadable.LoadableComponent)
}