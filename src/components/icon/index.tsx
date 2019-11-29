import classnames from 'classnames'
import * as React from 'react'

import './index.scss'

// tslint:disable-next-line:interface-name
export interface IconPropType {
    src: any
    className?: string
    onMouseEnter?: (e?: any) => void
    onMouseLeave?: (e?: any) => void
    style?: React.CSSProperties
    size?: 'sm' | 'md' | 'lg' | 'file'
    onClick?: (e?: any) => void
}


const Icon: React.StatelessComponent<IconPropType> = ({ src, className, style, size = 'sm', ...restProps }) => {
    const symbol = (typeof src === 'string' ? require(`../../res/${src}.svg`) : src).default
    const symbolId = symbol ? symbol.id : ''
    return (
        <svg
            className={classnames({
                'nm-icon': true,
                [`nm-icon-${symbolId}`]: true,
                [`nm-icon-${size}`]: true,
                [className as string]: !!className,
            })}
            style={style}
            {...restProps}
        >
            <use xlinkHref={`#${symbolId}`} />
        </svg>
    )
}

export default Icon
