import * as React from 'react'

// import { Spin } from 'antd'
import { Tabs } from 'antd'

import LoginByTel from '../loginByTel'

import LoginByPsd from '../loginByPsd'

import { FormProps } from 'antd/lib/form'

import { ILoginFormValue } from '../../interfaces'

import { ImgCodeProvider } from '../../hooks'

// import { FormProvider } from '../../hooks/useForm'
import { useForm } from '../../hooks/useForm'

import Footer, { IFooterProp } from '../footer'

import Icon from '../icon'

import classnames from 'classnames'

const { useState } = React

const { TabPane } = Tabs

import './index.scss'

// import 'antd/es/tabs/style/css'  //  因为tab样式的问题


export type ILoginType = 'tel' | 'psd'
export interface ILoginChildProps extends FormProps {
    login: (val: ILoginFormValue) => void
    sendCode: (tel: string) => void
    extraBtn?: React.ReactNode
    otherLogin?: React.ReactNode
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
    weChatLogin?: React.ReactNode
    login: (val: ILoginFormValue) => void
    sendCode: (tel: string) => void
}
export interface IWechatLogin {
    children: React.ReactNode
    isWechat: boolean
}

const ExtraBtn = () => (
    <div className='nm-login-extra-default'>
        <a
        >
            <span className='nm-login-extra-default-icon'>
                <Icon src='shandian' size='lg' />
            </span>
            <span>更快捷</span>
        </a>
        <a>
            <span className='nm-login-extra-default-icon'>
                <Icon src='safe' size='lg' />
            </span>
            <span>更安全</span>
        </a>
    </div>
)

function WechatLogin(props: IWechatLogin) {
    const { children, isWechat = false } = props
    return (
        <div className={classnames('nm-login-wechat', {
            'nm-login-wechat-show': isWechat
        })} >
            <Tabs>
                <TabPane tab="企业微信" key="wechat">
                    {children}
                </TabPane>
            </Tabs>
        </div>
    )
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
        otherLogin,
        weChatLogin = null
    } = props
    const logoImg = typeof logo === 'string' ? <img src={logo} /> : logo
    const childProps: ILoginChildProps = {
        extraBtn: !extraBtn ? <ExtraBtn /> : extraBtn,
        loading,
        login,
        otherLogin,
        sendCode,

    }
    const [isWechat, setWechat] = useState(false)
    const { setState } = useForm() as any || {}
    const changeTab = (val: string) => setState(val)
    const handleWechat = () => setWechat(!isWechat)
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
                    {
                        !!weChatLogin && (
                            <>
                                <i className={classnames('nm-login-qr-code', {
                                    'nm-login-qr-customer': isWechat
                                })} onClick={handleWechat} >
                                    <Icon src={isWechat ? 'computer' : 'wxcode'} style={{ width: 50, height: 50 }} />
                                </i>
                                <WechatLogin isWechat={isWechat}>{weChatLogin}</WechatLogin>
                            </>
                        )
                    }
                    <div className={classnames('nm-login-customer', {
                        'nm-login-customer-show': !isWechat
                    })}>
                        <Tabs defaultActiveKey={loginType[0]} onChange={changeTab}>
                            {
                                loginType.indexOf('tel') > -1 && (
                                    <TabPane tab="手机号" key="tel">
                                        <ImgCodeProvider><LoginByTel {...childProps} /></ImgCodeProvider>
                                    </TabPane>
                                )
                            }
                            {
                                loginType.indexOf('psd') > -1 && (
                                    <TabPane tab="账号" key="psd">
                                        <LoginByPsd {...childProps} />
                                    </TabPane>
                                )
                            }
                        </Tabs>
                    </div>
                    {/* {otherLogin} */}
                </div>
            </div>
            <Footer {...footerInfo} />
        </div>
    )
}

export default Login