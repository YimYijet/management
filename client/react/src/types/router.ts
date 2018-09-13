import { ComponentClass } from 'react'

export interface ILink {
    path: string
    title: string
}

export interface IRoute {
    path: string
    component: ComponentClass
}