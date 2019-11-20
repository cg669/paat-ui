
// import { action } from '@storybook/addon-actions'
// import { color } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { FormProvider, Login, useForm } from '../../index'

function login(val: any) {
  // tslint:disable-next-line:no-console
  console.log('i am login', val)
}

function sendCode(tel: string) {
  // tslint:disable-next-line:no-console
  console.log('send code', tel)
}
function Test() {
  // const { psdForm } = useForm() as any || {}
  // tslint:disable-next-line:no-console
  console.log(useForm(), ' useForm()')
  return (
    <Login
      logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
      title='我是标题'
      login={login}
      sendCode={sendCode}
      weChatLogin={<div style={{ width: 190, height: 190, textAlign: 'center', margin: '0 auto', border: '1px solid #000' }}>我是微信登录</div>}
    />
  )
}
storiesOf('登录', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      sidebar: `| 参数 | 说明 | 类型 | 默认值 |
      | --- | --- | --- | --- |
      | logo | logo地址 | string或者reactNode | - |
      | title | 小标题 |string | - |
      | login | 登录请求函数以及后续操作 | 函数（含有参数） | - |
      | sendCode | 发送验证码请求函数以及后续操作 | 函数（含有参数） | - |
      | loginType | 登录方式 | 数组 | ['psd','tel'] |
      | otherLogin | 其他登录方式 | ReactNode | - |
      | extraBtn | 其他小按钮 | ReactNode | - |
      | loading | 按钮loading | boolean | - |

      使用FormProvider包括组件可以用useForm获取当前显示的form,请使用useForm里面的state来判断formItem是否实例化
      `
    },

  })
  .add('常用', () => <FormProvider><Test /></FormProvider>)
  .add('单个', () => <Login
    logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
    title='我是标题'
    login={login}
    sendCode={sendCode}
    loginType={['psd']}
    extraBtn={''}
  />)
  .add('增加其他登录', () => <Login
    logo={'https://fileserver.paat.com/13f/13f9ca1e7f8b84a725a57550a395cf35.png'}
    title='我是标题'
    login={login}
    sendCode={sendCode}
  />)
