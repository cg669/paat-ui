
// import { action } from '@storybook/addon-actions'
// import { color } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Register } from '../../src'

function sendCode(tel: string) {
  // tslint:disable-next-line:no-console
  console.log('send code', tel)
}

function submit(val: any) {
  // tslint:disable-next-line:no-console
  console.log(val)
}

storiesOf('注册/忘记密码', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      sidebar: `| 参数 | 说明 | 类型 | 默认值 |
      | --- | --- | --- | --- |
      | logo | logo地址 | string或者reactNode | - |
      | title | 小标题 |string | - |
      | submit | 提交请求函数以及后续操作 | 函数（含有参数） | - |
      | sendCode | 发送验证码请求函数以及后续操作 | 函数（含有参数） | - |
      | loginType | 登录方式 | 数组 | ['psd','tel'] |
      | otherLogin | 其他登录方式 | ReactNode | - |
      | loading | 按钮loading | boolean | - |
      | isRegister | 是否注册 | boolean | true |
      | extraBtn | 其他小按钮 | ReactNode | - |
      `
    },
  })
  .add('注册', () => <Register
    logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
    title='我是注册'
    sendCode={sendCode}
    extraBtn={<a>立即登录</a>}
    submit={submit}
  />)
  .add('忘记密码', () => <Register
    logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
    title='我是忘记密码'
    sendCode={sendCode}
    extraBtn={<a>重置密码</a>}
    submit={submit}
    isRegister={false}
  />)
  .add('绑定手机号', () => <Register
    logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
    title='我是忘记密码'
    sendCode={sendCode}
    extraBtn={<a>重置密码</a>}
    submit={submit}
    isBindTel={true}
    isRegister={false}
  />)
