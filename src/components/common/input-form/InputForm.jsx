import PropTypes from 'prop-types'
import { formInputType } from '../../../utils/types'
import { useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'


function PasswordInput({ name, value, onChange }) {
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

export default function InputForm({ name, type, placeholder }) {
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

InputForm.propTypes = formInputType

PasswordInput.propTypes = PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}).isRequired