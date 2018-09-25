import React from 'react';
import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

interface IProps extends FormComponentProps {
    login: () => void
}

const FormItem = Form.Item

class LoginForm extends React.Component<IProps> {
    
    render() {
        const { login, form: { getFieldDecorator } } = this.props
        return (
            <Form onSubmit={login}>
                <FormItem>
                    {getFieldDecorator('name')}
                    <Input>

                    </Input>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(LoginForm)