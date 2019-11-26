import * as React from 'react'

// import { getFormItem } from '../../utils/domUtils'

import { Table } from 'antd'

import { TableProps } from 'antd/lib/table'




// import { FormProvider } from '../../hooks/useForm'

// import { IFormItem } from '../../utils/domUtils'


export interface ISearchTable {
    tableProps?: TableProps<any>
}

const SearchTable: React.SFC<ISearchTable> = (props: ISearchTable) => {
    const {
        tableProps
    } = props
    return (
        <Table {...tableProps} style={{ marginTop: 30 }} />
    )
}

// const FormSearchTable = Form.create()(SearchTable)
// const SearchTableA = (props: any) => <FormProvider><FormSearchTable {...props} /></FormProvider>
export default SearchTable