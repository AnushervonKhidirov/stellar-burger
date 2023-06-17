import PropTypes from 'prop-types'
import { formInputType } from '../../../utils/types'
import { useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'


function PasswordInput({ value, onChange }) {
    const [show, setShow] = useState(false)

    function handlePasswordInput() {
        setShow(!show)
    }

    return (
        <Input
            type={show ? 'text' : 'password'}
            value={value}
            placeholder='password'
            icon={show ? 'HideIcon' : 'ShowIcon'}
            onIconClick={handlePasswordInput}
            onChange={onChange}
        />
    )
}

export default function InputForm({ type, placeholder }) {
    const [value, setValue] = useState('')

    return type === 'password' ? (
        <PasswordInput value={value} onChange={e => setValue(e.target.value)} />
    ) : (
        <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    )
}

InputForm.propTypes = formInputType

PasswordInput.propTypes = PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}).isRequired