import React, { createContext, useState, useContext } from 'react'



//  验证码
const ImgCodeContext = createContext(null)

function useImgCodeProvider() {
    const [imgCode, setImgCode] = useState(null)
    const [rotate, setRotate] = useState(null)
    const [fz, setFZ] = useState(null)
    const [color, setColor] = useState(null)
    return { imgCode, setImgCode, rotate, setRotate, fz, setFZ, color, setColor }
}

export function useImgCode() {
    return useContext(ImgCodeContext)
}

export function ImgCodeProvider({ children }) {
    const imgCodeValues = useImgCodeProvider()
    return <ImgCodeContext.Provider value={imgCodeValues}>{children}</ImgCodeContext.Provider>
}

