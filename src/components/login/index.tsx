import * as React from 'react'

// import { Spin } from 'antd'
import { Tabs } from 'antd'

import LoginByTel from '../loginByTel'

import LoginByPsd from '../loginByPsd'

import { FormProps } from 'antd/lib/form'

import { ILoginFormValue } from '../../interfaces'

import { ImgCodeProvider } from '../../hooks'

import Footer, { IFooterProp } from '../footer'

const { TabPane } = Tabs

import './index.scss'

export type ILoginType = 'tel' | 'psd'
export interface ILoginChildProps extends FormProps {
    login: (val: ILoginFormValue) => void
    sendCode: (tel: string) => void
    extraBtn?: React.ReactNode
    loading?: boolean
}

export interface ILoginProps {
    loading?: boolean
    logo: string | React.ReactNode
    title?: string | React.ReactNode
    extraBtn?: React.ReactNode
    otherLogin?: React.ReactNode
    footerInfo?: IFooterProp
    loginType?: ILoginType[]
    login: (val: ILoginFormValue) => void
    sendCode: (tel: string) => void
}
function Login(props: ILoginProps) {
    const {
        loading = false,
        logo,
        title,
        extraBtn,
        login,
        loginType = ['tel', 'psd'],
        sendCode,
        footerInfo,
        otherLogin
    } = props
    const logoImg = typeof logo === 'string' ? <img src={logo} /> : logo
    const childProps: ILoginChildProps = {
        extraBtn,
        loading,
        login,
        sendCode,
    }
    return (
        <div className='nm-login'>
            <div className='nm-login-container'>
                <div className='nm-login-header'>
                    <div className='nm-login-header-logo'>{logoImg}</div>
                    {
                        title && <div className='nm-login-header-title'>{title}</div>
                    }
                </div>
                <div className='nm-login-main'>
                    {/* <i className='nm-login-qr-code' /> */}
                    <Tabs defaultActiveKey={loginType[0]}>
                        {
                            loginType.indexOf('tel') > -1 && (
                                <TabPane tab="手机号登录" key="tel">
                                    <ImgCodeProvider><LoginByTel {...childProps} /></ImgCodeProvider>
                                </TabPane>
                            )
                        }
                        {
                            loginType.indexOf('psd') > -1 && (
                                <TabPane tab="账号登录" key="psd">
                                    <LoginByPsd {...childProps} />
                                </TabPane>
                            )
                        }
                    </Tabs>
                    {otherLogin}
                </div>
            </div>
            <Footer {...footerInfo} />
        </div>
    )
}

export default Login