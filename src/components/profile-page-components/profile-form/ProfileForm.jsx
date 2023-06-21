import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function ProfileForm() {
    const dispatch = useDispatch()
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
            value: '',
            type: 'password',
        },
    ]

    function submitForm(e) {
        e.preventDefault()

        const dataToSend = {}

        new FormData(e.target).forEach((value, property) => {
            dataToSend[property] = value
        })

        // dispatch(onSubmit(dataToSend))
    }

    return userData && (
        <form style={profileFormStyles} className='mt-20' onSubmit={submitForm}>
            {userInfo?.map(info => (
                <ProfileInput
                    type={info.type}
                    value={info.value}
                    placeholder={info.title}
                    key={info.type}
                />
            ))}

            <div style={profileFormControlsStyles}>
                <Button htmlType="button" type="secondary" size="medium">
                    Отмена
                </Button>
                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
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
    width: '480px'
}

const profileFormControlsStyles = {
    display: 'flex',
    justifyContent: 'flex-end'
}

ProfileInput.propTypes = PropTypes.shape({
    type: PropTypes.oneOf(['text', 'email', 'password']).isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
}).isRequired
