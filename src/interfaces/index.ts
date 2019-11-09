export interface ILoginByTel {
    tel: string
    code: string,
    imgCode: string
}
export interface ILoginByPsd {
    tel: string
    psd: string
    isRemember?: boolean
}

export interface IRegister {
    code: string
    psd: string
    tel: string
}

export type ILoginFormValue = ILoginByTel | ILoginByPsd