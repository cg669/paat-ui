
// import { action } from '@storybook/addon-actions'
// import { color } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { ImgCodeProvider, VCode } from '../../index'

storiesOf('验证码', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      sidebar: `## 基本用法
      需要搭配hook,使用的地方用ImgCodeProvider包括一下，使用useImgCode获取当前状态的验证码`
    },
  })
  .add('常用', () => <ImgCodeProvider><VCode /></ImgCodeProvider>)
