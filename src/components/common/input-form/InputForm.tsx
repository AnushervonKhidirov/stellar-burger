import type { FC, ChangeEvent } from 'react'
import type { FormInput } from '../../../utils/interfaces'

import { useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

interface PasswordInputType {
    value: string
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputForm: FC<FormInput> = ({ name, type, placeholder }) => {
    const [value, setValue] = useState('')

    return type === 'password' ? (
        <PasswordInput name={name} value={value} onChange={e => setValue(e.target.value)} />
    ) : (
        <Input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    )
}

const PasswordInput: FC<PasswordInputType> = ({ name, value, onChange }) => {
    const [show, setShow] = useState(false)

    function handlePasswordInput() {
        setShow(!show)
    }

    return (
        <Input
            name={name}
            type={show ? 'text' : 'password'}
            value={value}
            placeholder='password'
            icon={show ? 'HideIcon' : 'ShowIcon'}
            onIconClick={handlePasswordInput}
            onChange={onChange}
        />
    )
}

export default InputForm
