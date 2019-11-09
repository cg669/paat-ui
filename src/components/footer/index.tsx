import classnames from 'classnames'
import * as React from 'react'
import './index.scss'
export interface IFooterProp {
    info?: string,
    size?: 'sm' | 'md' | 'lg',
    className?: string,
    style?: React.CSSProperties
}
function Footer(props: IFooterProp) {

    const { info = 'Copyright 2019 普道（上海）信息科技有限公司', size = 'sm', className = '', style, ...restProps } = props

    return (
        <div
            className={
                classnames('nm-footer', {
                    [`nm-footer-${size}`]: true,
                    [className]: !!className
                })
            }
            style={style}
            {...restProps}
        >{info}</div>
    )
}

export default Footer