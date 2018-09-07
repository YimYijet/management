import * as React from 'react'
import { Input, Card } from 'antd'

export interface IProps {
    name: string,
    age?: number,
    ChangeName?: () => void
}

export default class TestComponent extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    render() {
        const { name, age,  ChangeName} = this.props
        return (
            <div>
                <Card title={name}>年龄：{age}</Card>
                <Input onChange={ChangeName}></Input>
            </div>
        )
    }
}