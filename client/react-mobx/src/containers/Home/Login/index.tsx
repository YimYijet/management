import React from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { observer, inject } from 'mobx-react'
import { IStoreState } from '@/types'

interface IStoreProps {
    userId?: string
    login?: (values) => void
}

interface IProps extends IStoreProps, FormComponentProps {

}

const FormItem = Form.Item

@inject((store: IStoreState): IStoreProps => {
    const { userId, login } = store.curUserStore
    return { userId, login }
})
@observer
class LoginForm extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    handleSubmit(e) {
        const { login, form } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                login(values)
            }
        })
    }

    render() {
        const { userId, form: { getFieldDecorator } } = this.props
        return (
            !userId ?
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <FormItem>
                        {getFieldDecorator('account', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名'
                                }
                            ]
                        })(
                            <Input placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码'
                                }
                            ]
                        })(
                            <Input placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit">登录</Button>
                    </FormItem>
                </Form> :
                <span>{userId}</span>
        )
    }
}

export default Form.create()(LoginForm)