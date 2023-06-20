import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

export default function ProfileForm() {
    const userData = useSelector(store => store.profile.useData)

    const userInfo = [
        {
            title: 'Имя',
            value: userData?.name,
            type: 'text',
        },
        {
            title: 'Логин',
            value: userData?.email,
            type: 'email',
        },
        {
            title: 'Пароль',
            value: userData?.password ? userData.password : '',
            type: 'password',
        },
    ]

    return userData && (
        <form style={profileFormStyles} className='mt-20'>
            {userInfo?.map(info => (
                <ProfileInput
                    type={info.type}
                    value={info.value}
                    placeholder={info.title}
                    key={info.type}
                />
            ))}
        </form>
    )
}

function ProfileInput({ type, value, placeholder }) {
    const [newValue, setNewValue] = useState(value)
    const [isDisabled, setDisabled] = useState(true)

    function inputValueHandler(e) {
        setNewValue(e.target.value)
    }

    function inputDisableHandler() {
        setDisabled(!isDisabled)
    }

    return (
        <Input
            type={type}
            value={newValue}
            disabled={isDisabled}
            placeholder={placeholder}
            onIconClick={inputDisableHandler}
            onChange={inputValueHandler}
            icon='EditIcon'
        />
    )
}

const profileFormStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
}

ProfileInput.propTypes = PropTypes.shape({
    type: PropTypes.oneOf(['text', 'email', 'password']).isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
}).isRequired
