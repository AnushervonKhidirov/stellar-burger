import type { FC, ChangeEvent, FormEvent, SetStateAction, Dispatch } from 'react'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { updateUser } from '../../../services/store/user/action'
import { profileSelector } from '../../../utils/selectors'

import styles from './ProfileForm.module.css'

interface IProfileInputData {
    readonly title: string
    readonly name: inputNames
    readonly type: 'text' | 'email' | 'password'
    value: string
}

interface IProfileInput {
    readonly name: inputNames
    readonly profileForm: IProfileInputData[]
    readonly setProfileForm: Dispatch<SetStateAction<IProfileInputData[]>>
}

interface ISendData {
    [key: string]: string
}

type inputNames = Readonly<'name' | 'email' | 'password'>

const ProfileForm: FC = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(profileSelector)
    const [profileForm, setProfileForm] = useState<IProfileInputData[]>([])

    const setInitialData = useCallback(() => {
        setProfileForm([
            {
                title: 'Имя',
                value: user.userInfo ? user.userInfo.name : '',
                name: 'name',
                type: 'text',
            },
            {
                title: 'Логин',
                value: user.userInfo ? user.userInfo.email : '',
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

    function submitForm(e: FormEvent) {
        e.preventDefault()
        const dataToSend: ISendData = {}

        profileForm?.forEach(item => {
            if (item.name !== 'password' && user.userInfo) {
                if (item.value !== user.userInfo[item.name]) dataToSend[item.name] = item.value
            } else {
                if (item.value !== '') dataToSend[item.name] = item.value
            }
        })

        dispatch(updateUser(dataToSend))
    }

    return (
        <form className={`${styles.profile_form} mt-20`} onSubmit={submitForm}>
            {profileForm?.map(info => (
                <ProfileInput
                    name={info.name}
                    profileForm={profileForm}
                    setProfileForm={setProfileForm}
                    key={info.type}
                />
            ))}

            <div className={styles.profile_form_controls}>
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

const ProfileInput: FC<IProfileInput> = ({ name, profileForm, setProfileForm }) => {
    const [isDisabled, setDisabled] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null)
    const item = profileForm.filter(item => item.name === name)[0]

    function inputValueHandler(e: ChangeEvent<HTMLInputElement>) {
        setProfileForm(prevState =>
            prevState.map(item => {
                if (item.name === name) {
                    item.value = e.target.value
                }
                return item
            })
        )
    }

    useEffect(() => {
        !isDisabled ? inputRef.current?.focus() : inputRef.current?.blur()
    }, [isDisabled])

    return (
        <Input
            ref={inputRef}
            name={name}
            type={item.type}
            value={item.value}
            disabled={isDisabled}
            placeholder={item.title}
            onIconClick={() => setDisabled(prev => !prev)}
            onChange={inputValueHandler}
            icon={isDisabled ? 'EditIcon' : 'CloseIcon'}
        />
    )
}

export default ProfileForm
