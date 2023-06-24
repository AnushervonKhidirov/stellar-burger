import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'
import { loginUser } from '../../services/user/action'

export default function Login() {
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

    return (
        <>
            <Form headline='Вход' inputs={inputs} buttonText='Войти' submitFunc={loginUser} />
            <FormFooter data={footerData} />
        </>
    )
}
