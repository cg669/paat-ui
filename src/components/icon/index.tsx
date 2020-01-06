import classnames from 'classnames'
import * as React from 'react'

import './index.scss'

import Res from '../../res'

// tslint:disable-next-line:interface-name
export interface IconPropType {
    src: any
    className?: string
    onMouseEnter?: (e?: any) => void
    onMouseLeave?: (e?: any) => void
    style?: React.CSSProperties
    size?: 'sm' | 'md' | 'lg' | 'file'
    onClick?: (e?: any) => void
    width?: number
    height?: number
}


const Icon: React.StatelessComponent<IconPropType> = ({ src, className, style, size = 'sm', ...restProps }) => {
    const ResSvg = Res[src]
    return (
        <ResSvg
            className={classnames({
                'nm-icon': true,
                [`nm-icon-${size}`]: true,
                [className as string]: !!className,
            })}
            style={style}
            {...restProps}
        />
    )
}

export default Icon
