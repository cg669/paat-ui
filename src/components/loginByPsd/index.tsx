import * as React from 'react'

import { Button, Checkbox, Form, Input } from 'antd'

import { FormComponentProps } from 'antd/lib/form'

import { MobileReg } from '../../utils/validators'

import './index.scss'

import { ILoginFormValue } from '../../interfaces'


interface ILoginByPsd extends FormComponentProps {
    login: (val: ILoginFormValue) => void
    sendCode?: (tel: string) => void
    extraBtn?: React.ReactNode
    loading?: boolean
}

function LoginByPsd(props: ILoginByPsd) {

    const {
        form,
        loading,
        login,
        extraBtn,
    } = props
    const {
        getFieldDecorator,
        validateFields
    } = form

    const save = () => {
        validateFields((err, values) => {
            if (!err) {
                login(values)
            }
        })
    }
    return (
        <Form className='nm-login-by-psd'>
            <Form.Item required={true}>
                {
                    getFieldDecorator('tel', {
                        rules: [
                            {
                                message: '请输入电话', required: true, whitespace: true
                            },
                            {
                                message: '电话格式错误', pattern: MobileReg,
                            }
                        ]
                    })(<Input placeholder='请输入手机号' />)
                }
            </Form.Item>
            <Form.Item required={true}>
                {
                    getFieldDecorator('psd', {
                        rules: [
                            {
                                message: '请输入密码', required: true, whitespace: true
                            },
                            {
                                message: '请输入6-16位密码，区分大小写',
                                min: 6,
                                // tslint:disable-next-line:object-literal-sort-keys
                                max: 16,
                            }
                        ]
                    })(<Input.Password placeholder='请输入密码' />)
                }
            </Form.Item>
            <Form.Item style={{ marginBottom: 18 }}>
                <Button
                    type='primary'
                    className='nm-login-by-psd-btn'
                    onClick={save}
                    loading={loading}
                >
                    登录
                </Button>
            </Form.Item>
            <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {
                        getFieldDecorator('isRemember')(<Checkbox>记住密码</Checkbox>)
                    }
                    {extraBtn && <div className='nm-login-extra'>{extraBtn}</div>}
                </div>
            </Form.Item>
        </Form>
    )
}

export default Form.create()(LoginByPsd)
