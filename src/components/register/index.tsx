import * as React from 'react'

import Footer, { IFooterProp } from '../footer'

import { Button, Form, Input } from 'antd'

import { FormComponentProps } from 'antd/lib/form'

import useCountDown from "../../hooks/useCountDown"

import { MobileReg } from '../../utils/validators'

import { IRegister } from '../../interfaces'

import "./index.scss"

// import 'antd/es/tabs/style/css'  //  因为tab样式的问题

export interface IRegisterProps {
    loading?: boolean
    logo: string | React.ReactNode
    title?: string | React.ReactNode
    footerInfo?: IFooterProp
    extraBtn?: React.ReactNode
    isRegister?: boolean
    isBindTel?: boolean
    sendCode: (tel: string) => void
    submit: (val: IRegister) => void
}

export type IRegisterFormProps = IRegisterProps & FormComponentProps

function RegisterItem(props: IRegisterFormProps) {

    const { start, isRunning, num } = useCountDown()

    const {
        loading = false,
        logo,
        title,
        extraBtn,
        footerInfo,
        form,
        sendCode,
        isRegister = true,
        isBindTel = false,
        submit
    } = props

    const {
        getFieldDecorator,
        getFieldValue,
        validateFields,
    } = form

    const logoImg = typeof logo === 'string' ? <img src={logo} /> : logo

    const checkConfirmPsd = (rule: any, value: string, callback: any) => {
        if (!value) {
            callback()
        } else {
            const psd = getFieldValue('psd')
            if (psd !== value) {
                callback('两次密码输入不一致')
            } else {
                callback()
            }
        }
    }

    const handleSendCode = () => {
        validateFields(['tel'], (err, val) => {
            if (!err) {
                if (isRunning) {
                    return
                }
                start(60)
                sendCode(val.tel)
            }
        })
    }

    const handleSubmit = () => {
        validateFields((err, values) => {
            if (!err) {
                submit(values)
            }
        })
    }

    return (
        <div className='nm-register'>
            <div className='nm-register-container'>
                <div className='nm-register-header'>
                    <div className='nm-register-header-logo'>{logoImg}</div>
                    {
                        title && <div className='nm-register-header-title'>{title}</div>
                    }
                </div>
                <div className='nm-register-main'>
                    <Form className='nm-register-form'>
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
                        <Form.Item required={true} className='positionrel'>
                            {
                                getFieldDecorator('code', {
                                    rules: [
                                        {
                                            message: '请输入手机验证码', required: true, whitespace: true
                                        }
                                    ]
                                })(<Input placeholder='请输入手机验证码' />)
                            }
                            <div className='nm-register-img-code'><Button type='link' onClick={handleSendCode}>{isRunning ? `${num}s` : '获取验证码'}</Button></div>
                        </Form.Item>
                        {
                            !isBindTel && (
                                <>
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
                                            })(<Input.Password placeholder={isRegister ? '请输入6-16位密码，区分大小写' : '请输入新密码(请输入6-16位密码，区分大小写)'} />)
                                        }
                                    </Form.Item>
                                    <Form.Item required={true}>
                                        {
                                            getFieldDecorator('confirmPsd', {
                                                rules: [
                                                    {
                                                        message: '请输入确认密码', required: true, whitespace: true
                                                    },
                                                    {
                                                        validator: checkConfirmPsd
                                                    }
                                                ]
                                            })(<Input.Password placeholder='请输入确认密码' />)
                                        }
                                    </Form.Item>
                                </>
                            )
                        }
                        <Form.Item style={{ marginBottom: 18 }}>
                            <Button
                                type='primary'
                                className='nm-register-btn'
                                loading={loading}
                                onClick={handleSubmit}
                            >
                                {
                                    isBindTel ? '确定' : (
                                        isRegister ? '注册' : '确认修改'
                                    )
                                }
                            </Button>
                        </Form.Item>
                        {extraBtn && <Form.Item><div className='nm-login-extra'>{extraBtn}</div></Form.Item>}
                    </Form>
                </div>
            </div>
            <Footer {...footerInfo} />
        </div>
    )
}

const RegisterForm = Form.create()(RegisterItem) as any

const Register = (props: IRegisterProps) => <RegisterForm {...props} />
export default Register