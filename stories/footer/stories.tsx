import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Footer } from '../../src'

storiesOf('页脚', module)
    .addDecorator(withKnobs)
    .addParameters({
        readme: {
            // Show readme before story
            sidebar: `| 参数 | 说明 | 类型 | 默认值 |
      | --- | --- | --- | --- |
      | info | 显示文本内容 | string | Copyright 2019 普道（上海）信息科技有限公司 |
      | size | 大小 | sm md lg file | sm |`
        },
    })
    .add('常用', () => <Footer />)