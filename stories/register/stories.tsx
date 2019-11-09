
// import { action } from '@storybook/addon-actions'
// import { color } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Register } from '../../index'

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
      | src | icon的图标地址 | any | - |
      | size | 大小 | sm md lg file | sm |`
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
