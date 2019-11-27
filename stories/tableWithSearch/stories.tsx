
// import { action } from '@storybook/addon-actions'
// import { color } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { TableWithSearch } from '../../src'


const searchLoading = false;

function search(values: any) {
  // tslint:disable-next-line:no-console
  console.log(values, 'values')
}

class Demo2 extends React.Component {
  public state = {
    loading: false
  }
  public handleSearch = (val: any) => {
    // tslint:disable-next-line:no-console
    console.log(val, 'val')
    this.setState({
      loading: true
    }, () => {
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 2000)
    })
  }
  public render() {
    const { loading } = this.state
    return (
      <TableWithSearch
        searchProps={
          {
            search: this.handleSearch,
            searchList,
            searchLoading: loading,
          }
        } />
    )
  }
}

const searchList = [
  {
    field: 'name',
    name: '姓名',
    type: 'Input'
  },
  {
    field: 'age',
    name: '年龄',
    type: 'Input'
  }, {
    data: [
      { value: '1', label: '哈哈' },
      { value: '2', label: '嘿嘿' },
    ],
    field: 'select',
    name: '动词',
    type: 'Select',
  }, {
    field: 'timeRange',
    name: '岂止时间',
    type: 'RangePicker',
  },
  {
    field: 'time',
    name: '时间',
    type: 'DatePicker'
  },
  {
    field: 'time2',
    name: '时间2',
    type: 'TimePicker'
  }
]

storiesOf('搜索框table', module)
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
  .add('常用', () => <TableWithSearch
    searchProps={
      {
        search,
        searchList,
        searchLoading,
      }
    }
  />)
  .add('class', () => <Demo2 />)
