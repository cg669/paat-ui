import * as React from 'react'


import { DatePicker, Input, Radio, Select, Switch, TimePicker } from 'antd'

import { GetFieldDecoratorOptions } from 'antd/lib/form/Form'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker

const antdList = {
    DatePicker, Input, MonthPicker, Radio, RangePicker, Select, Switch, TimePicker, WeekPicker,
}



export interface IFormItem {
    field: string
    type: string
    data?: any[]
    name?: string
    placeholder?: string
    style?: any
    formProps?: GetFieldDecoratorOptions
}
export function getFormItem(formItem: IFormItem): React.ReactNode {

    const { type, data = [], placeholder = "请输入", style, ...rest } = formItem

    const domProps = {
        placeholder:
            type === "RangePicker" && typeof placeholder === "string"
                ? ["初始时间", "结束时间"]
                : placeholder,
        style: {
            width: '100%',
            ...style
        },
        ...rest
    }

    if (type === "Select") {
        return (
            <Select {...domProps}>
                {data &&
                    data.map(item => (
                        <Select.Option value={item.value} key={item.value}>
                            {item.label}
                        </Select.Option>
                    ))}
            </Select>
        )
    }
    const Ele = antdList[type]
    return <Ele {...domProps} />
}
