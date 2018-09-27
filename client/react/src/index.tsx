import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import Router from '@/containers/Router'

ReactDom.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('app') as HTMLElement
)
