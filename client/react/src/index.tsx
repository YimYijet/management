import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import StoreConfig from '@/store'
import Test from '@/containers/test'

const store = StoreConfig()

ReactDom.render(
    <Provider store={store}>
        <Test />
    </Provider>,
    document.getElementById('app') as HTMLElement
)