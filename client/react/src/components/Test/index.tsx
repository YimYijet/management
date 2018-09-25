import * as React from 'react'
import { Input, Card } from 'antd'

export interface IProps {
    age?: number
    name: string
    ChangeName?: (age, e) => void
}

export default function TestComponent(props: IProps): React.ReactElement<IProps> {
    const { name, age, ChangeName }: IProps = props
    console.log(props)
    return (
        <div>
            <Card title={name}>年龄：{age}</Card>
            <Input onChange={(e) => ChangeName(age, e)} />
        </div>
    )
}
