import * as React from 'react'

// import { getFormItem } from '../../utils/domUtils'

// import { Form } from 'antd'

import FormSearchField, { ISearchField } from '../formSearchField'


import SearchTable, { ISearchTable } from '../searchTable'
// import { FormProvider } from '../../hooks/useForm'

// import { IFormItem } from '../../utils/domUtils'


export interface ITableWithSearch {
    searchProps: ISearchField
    tableProps?: ISearchTable

}

const TableWithSearch: React.SFC<ITableWithSearch> = (props: ITableWithSearch) => {

    const {
        searchProps,
        tableProps
    } = props
    // tslint:disable-next-line:no-console
    // console.log(props, 'searchProps')
    return (
        <>
            <FormSearchField {...searchProps} />
            <SearchTable {...tableProps} />
        </>
    )
}

// const FormSearchTable = Form.create()(SearchTable)
// const SearchTableA = (props: any) => <FormProvider><FormSearchTable {...props} /></FormProvider>
export default TableWithSearch