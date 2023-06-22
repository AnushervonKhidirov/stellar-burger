import PropTypes from 'prop-types'
import { useCallback, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { updateUser } from '../../../store/profileSlice'

import Loader from '../../common/loader/Loader'

export default function ProfileForm() {
    const dispatch = useDispatch()
    const user = useSelector(store => store.profile)
    const [profileForm, setProfileForm] = useState(null)

    const setInitialData = useCallback(() => {
        setProfileForm([
            {
                title: 'Имя',
                value: user.userInfo?.name,
                name: 'name',
                type: 'text',
            },
            {
                title: 'Логин',
                value: user.userInfo?.email,
                name: 'email',
                type: 'email',
            },
            {
                title: 'Пароль',
                value: '',
                name: 'password',
                type: 'password',
            },
        ])
    }, [user.userInfo])

    useLayoutEffect(() => {
        if (user.userInfo) setInitialData()
    }, [user.userInfo, setInitialData])

    function submitForm(e) {
        e.preventDefault()
        const dataToSend = {}

        profileForm.forEach(item => {
            if (item.name !== 'password') {
                if (item.value !== user.userInfo[item.name]) dataToSend[item.name] = item.value
            } else {
                if (item.value !== '') dataToSend[item.name] = item.value
            }
        })

        dispatch(updateUser(dataToSend))
    }

    return user.isLoading ? (
        <Loader />
    ) : (
        <form style={profileFormStyles} className='mt-20' onSubmit={submitForm}>
            {profileForm?.map(info => (
                <ProfileInput
                    name={info.name}
                    profileForm={profileForm}
                    setProfileForm={setProfileForm}
                    key={info.type}
                />
            ))}

            <div style={profileFormControlsStyles}>
                <Button htmlType='button' type='secondary' size='medium' onClick={setInitialData}>
                    Отмена
                </Button>
                <Button htmlType='submit' type='primary' size='medium'>
                    Сохранить
                </Button>
            </div>
        </form>
    )
}

function ProfileInput({ name, profileForm, setProfileForm }) {
    const [isDisabled, setDisabled] = useState(true)
    const item = profileForm.filter(item => item.name === name)[0]

    function inputValueHandler(e) {
        setProfileForm(prevState =>

            prevState.map(item => {
                if (item.name === name) {
                    item.value = e.target.value
                }
                return item
            })
        )
    }

    function inputDisableHandler() {
        setDisabled(!isDisabled)
    }

    return (
        <Input
            name={name}
            type={item.type}
            value={item.value}
            disabled={isDisabled}
            placeholder={item.title}
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

const profileFormControlsStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
}

ProfileInput.propTypes = {
    name: PropTypes.oneOf(['name', 'email', 'password']).isRequired,
    profileForm: PropTypes.arrayOf(PropTypes.object).isRequired,
    setProfileForm: PropTypes.func.isRequired,
}
