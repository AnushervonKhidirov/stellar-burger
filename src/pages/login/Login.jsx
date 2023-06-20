import { useNavigate } from 'react-router-dom'

import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'
import { loginUser } from '../../store/profileSlice'
import { useEffect } from 'react'

export default function Login() {
    const isAuthorized = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    const inputs = [
        {
            type: 'email',
            name: 'email',
            placeholder: 'E-mail',
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
        },
    ]

    const footerData = [
        {
            text: 'Вы - новый пользователь?',
            link: {
                title: 'Зарегистрироваться',
                href: '/register',
            },
        },
        {
            text: 'Забыли пароль?',
            link: {
                title: 'Восстановить пароль',
                href: '/forgot-password',
            },
        },
    ]

    useEffect(() => {
        // if (isAuthorized) navigate('/profile')
    }, [isAuthorized, navigate])

    return (
        <>
            <Form headline='Вход' inputs={inputs} buttonText='Войти' onSubmit={loginUser} />
            <FormFooter data={footerData} />
        </>
    )
}
