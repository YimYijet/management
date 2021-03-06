import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { IStoreState } from '@/types'
import { Login } from '@/actions/CurUser'

interface IProps extends FormComponentProps {
    userId: string
    dispatch: Function
}

const FormItem = Form.Item

class LoginForm extends React.Component<IProps> {

    private myRef: any = React.createRef()

    handleSubmit(e) {
        const { dispatch, form } = this.props
        form.validateFields(async (err, values) => {
            if (!err) {
                await dispatch(Login(values))
                // console.log(this.myRef)
                this.myRef.current.style = 'color: #66ccff;'
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
            <span ref={this.myRef}>{userId}</span>
        )
    }
}

function mapStateToProps({ curUser: { userId } }: IStoreState) {
    return {
        userId
    }
}

export default connect(mapStateToProps)(Form.create()(LoginForm))