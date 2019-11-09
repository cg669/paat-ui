import * as React from 'react'

import { useImgCode } from '../../hooks'

import './index.scss'

import { getRandom, getRndCode } from '../../utils/utils'

const { useEffect, useCallback } = React

function VCode() {

    const { imgCode, setImgCode, rotate, setRotate, fz, setFZ, color, setColor } = useImgCode() as any

    const changeImgCode = useCallback(() => {
        const data = getRndCode()
        const initialRotate = getRandom(35, -35, 4)
        const initialFz = getRandom(20, 28, 4)
        const initialColor = [
            getRandom(100, 255, 3),
            getRandom(100, 255, 4),
            getRandom(100, 255, 3),
            getRandom(100, 255, 3),
        ]
        setImgCode(data)
        setRotate(initialRotate)
        setFZ(initialFz)
        setColor(initialColor)
    }, [setImgCode, setRotate, setFZ, setColor, getRandom, getRndCode])

    useEffect(() => {
        changeImgCode()
    }, [])

    return (
        <div className='nm-img-code' onClick={changeImgCode}>
            {imgCode && imgCode.map((v: number, i: number) => (
                <div
                    key={i}
                    className='nm-img-code-str'
                    style={{
                        color: `rgb(${color[i].toString()})`,
                        fontSize: `${fz[i]}px`,
                        transform: `rotate(${rotate[i]}deg)`,
                    }}
                >
                    {v}
                </div>
            ))}
        </div>
    )
}

export default VCode