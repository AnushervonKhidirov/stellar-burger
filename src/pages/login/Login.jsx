import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

export default function Login() {
    const inputs = [
        {
            type: 'email',
            placeholder: 'E-mail',
        },
        {
            type: 'password',
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
            <Form headline='Вход' inputs={inputs} buttonText='Войти' />
            <FormFooter data={footerData} />
        </>
    )
}
