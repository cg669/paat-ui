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
            {/* <img src={'data:image/png;base64,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'} width='50' className='nm-login-extra-default-icon' /> */}
            <span className='nm-login-extra-default-icon'>
                <Icon src='circle' style={{ width: 50, height: 50 }} className='nm-sub-icon' />
                {/* <Icon src='polygon' style={{ width: 60, height: 56, left: 12, top: 12 }} className='nm-icon-polygon' /> */}
                <Icon src='shandian' style={{ width: 60, height: 56, left: 12, top: 12 }} className='nm-icon-polygon' />
            </span>
            <span>更快捷</span>
        </a>
        <a>
            {/* <img src={'data:image/png;base64,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'} className='nm-login-extra-default-icon' /> */}
            <span className='nm-login-extra-default-icon'>
                <Icon src='circle' style={{ width: 50, height: 50 }} className='nm-sub-icon' />
                <Icon src='polygon' style={{ width: 60, height: 56, left: 12, top: 12 }} className='nm-icon-polygon' />
                <Icon src='safe' style={{ width: 60, height: 56, left: 12, top: 12 }} className='nm-icon-bold' />
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