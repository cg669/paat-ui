import * as React from 'react'

import { Button, Form, Input } from 'antd'

import { FormComponentProps } from 'antd/lib/form'

import { MobileReg } from '../../utils/validators'

import VCode from '../vCode'

import './index.scss'

import { ILoginFormValue } from '../../interfaces'

import { useImgCode } from '../../hooks'

import { useForm } from '../../hooks/useForm'

import useCountDown from "../../hooks/useCountDown"

const { useMemo } = React

interface ILoginByTel extends FormComponentProps {
    login: (val: ILoginFormValue) => void
    sendCode: (tel: string) => void
    extraBtn?: React.ReactNode
    loading?: boolean
}

function LoginByTel(props: ILoginByTel) {

    const { imgCode } = useImgCode() as any

    const { start, isRunning, num } = useCountDown()

    const {
        form,
        login,
        sendCode,
        extraBtn,
        loading
    } = props
    const {
        getFieldDecorator,
        validateFields
    } = form

    const { telForm, setTelForm } = useForm() as any || {}

    useMemo(() => {
        if (!telForm && setTelForm) {
            setTelForm(form)
        }
    }, [form, setTelForm, telForm])
    // setPsdForm(form)

    const checkImgCode = (rule: any, value: any, callback: any) => {
        if (!value) {
            callback()
        } else {
            const codes: string = imgCode.join('').toLowerCase()
            if (value.toLowerCase() !== codes) {
                callback('图形验证码错误')
            } else {
                callback()
            }
        }
    }
    const handleSendCode = () => {
        validateFields(['imgCode', 'tel'], (err, val) => {
            if (!err) {
                if (isRunning) {
                    return
                }
                start(60)
                sendCode(val.tel)
            }
        })
    }
    const save = () => {
        validateFields((err, values) => {
            if (!err) {
                login(values)
            }
        })
    }
    return (
        <Form className='nm-login-by-tel'>
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
                    getFieldDecorator('imgCode', {
                        rules: [
                            {
                                validator: checkImgCode
                            },
                            {
                                message: '请输入图片验证码', required: true, whitespace: true,
                            },
                        ],
                        // validateTrigger: 'onBlur',
                    })(<Input placeholder='请输入图片验证码' />)
                }
                <div className='nm-login-by-tel-img-code'><VCode /></div>
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
                <div className='nm-login-by-tel-img-code'><Button type='link' style={{ fontSize: 14 }} onClick={handleSendCode}>{isRunning ? `${num}s` : '获取验证码'}</Button></div>
            </Form.Item>
            <Form.Item style={{ marginBottom: 10 }}>
                <Button
                    type='primary'
                    className='nm-login-by-tel-btn'
                    onClick={save}
                    loading={loading}
                >
                    登录
                </Button>
            </Form.Item>
            {extraBtn && <Form.Item><div className='nm-login-extra'>{extraBtn}</div></Form.Item>}
        </Form>
    )
}

export default Form.create()(LoginByTel)
