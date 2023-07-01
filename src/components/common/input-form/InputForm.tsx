import type { ReactElement, ChangeEvent } from 'react'
import type { FormInput } from '../../../utils/interfaces'

import { useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'


interface PasswordInputType {
    value: string
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function InputForm({ name, type, placeholder }: FormInput): ReactElement {
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

function PasswordInput({ name, value, onChange }: PasswordInputType): ReactElement {
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
