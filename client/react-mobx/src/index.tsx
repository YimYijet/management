import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'mobx-react'
import * as store from '@/store'
import Router from '@/containers/Router'

ReactDom.render(
    <Provider {...store}>
        <Router />
    </Provider>,
    document.getElementById('app') as HTMLElement
)