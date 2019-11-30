import * as React from 'react'

import { getFormItem, IFormItem } from '../../utils/domUtils'

import { Button, Col, Form, Row } from 'antd'

import { FormComponentProps } from 'antd/lib/form'

import './index.scss'
// import { FormProvider } from '../../hooks/useForm'

// const searchList = [
//     {
//         field: 'name',
//         type: 'Input',
//     }
// ]

export interface ISearchField {
    searchList: IFormItem[]
    search: (value: any) => void
    searchLoading?: boolean
}

export type ISearchFieldForm = ISearchField & FormComponentProps
const colProps = {
    lg: 12,
    md: 12,
    sm: 24,
    xl: 8,
    xs: 24,
}
const SearchField: React.SFC<ISearchFieldForm> = (props: ISearchFieldForm) => {
    const {
        search,
        searchLoading = false,
        searchList,
        form,
    } = props
    const { validateFields, getFieldDecorator, resetFields } = form
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            search(values)
        })
    }
    // const handleReset = () => {
    //     resetFields()
    // }
    return (
        <Form className="nm-advanced-search-form" onSubmit={handleSearch}>
            <Row gutter={24}>
                {
                    searchList && searchList.map((x: IFormItem, index: number) => (
                        <Col key={x.field} {...colProps} style={{ display: index < searchList.length ? 'block' : 'none' }}>
                            <Form.Item label={x.name}>
                                {
                                    getFieldDecorator(x.field, {
                                        ...x.formProps
                                    })(getFormItem(x))
                                }
                            </Form.Item>
                        </Col>
                    ))
                }
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" loading={searchLoading}>
                        查询
                    </Button>
                    {/* <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                        重置
                    </Button> */}
                </Col>
            </Row>
        </Form>
    )
}


export default Form.create()(SearchField) as any