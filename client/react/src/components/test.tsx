import * as React from 'react'
import { Input, Card } from 'antd'

export interface IProps {
    name: string,
    age?: number,
    ChangeName?: (age, e) => void
}

export default class TestComponent extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    render() {
        const { name, age,  ChangeName } = this.props
        return (
            <div>
                <Card title={name}>年龄：{age}</Card>
                <Input onChange={(e) => ChangeName(age, e)}/>
            </div>
        )
    }
}
