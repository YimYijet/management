import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import StoreConfig from '@/store'
import TestComponent from '@/components/test'

const store = StoreConfig()

ReactDom.render(
    <Provider store={store}>
        <TestComponent name='morty'></TestComponent>
    </Provider>,
    document.getElementById('app') as HTMLElement
)