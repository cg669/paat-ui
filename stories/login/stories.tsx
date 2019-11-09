
// import { action } from '@storybook/addon-actions'
// import { color } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Login } from '../../index'

function login(val: any) {
  // tslint:disable-next-line:no-console
  console.log('i am login', val)
}

function sendCode(tel: string) {
  // tslint:disable-next-line:no-console
  console.log('send code', tel)
}

storiesOf('登录', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      sidebar: `| 参数 | 说明 | 类型 | 默认值 |
      | --- | --- | --- | --- |
      | src | icon的图标地址 | any | - |
      | size | 大小 | sm md lg file | sm |`
    },
  })
  .add('常用', () => <Login
    logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
    title='我是标题'
    login={login}
    sendCode={sendCode}
  />)
  .add('单个', () => <Login
    logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
    title='我是标题'
    login={login}
    sendCode={sendCode}
    loginType={['psd']}
  />)
  .add('增加其他登录', () => <Login
    logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
    title='我是标题'
    login={login}
    sendCode={sendCode}
    otherLogin={<a>我是其他登录</a>}
  />)
