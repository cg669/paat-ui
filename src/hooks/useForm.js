import React, { useState, createContext, useContext } from 'react'

const FormContext = createContext(null)

function useFormProvider() {
    const [telForm, setTelForm] = useState(null)
    const [psdForm, setPsdForm] = useState(null)
    const [state, setState] = useState('tel')
    return { telForm, setTelForm, psdForm, setPsdForm, state, setState }
}

export function useForm() {
    return useContext(FormContext)
}

export function FormProvider({ children }) {
    const formValues = useFormProvider()
    return <FormContext.Provider value={formValues}>{children}</FormContext.Provider>
}
