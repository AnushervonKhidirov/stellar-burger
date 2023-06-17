import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

export default function Register() {
    const inputs = [
        {
            type: 'text',
            placeholder: 'Имя',
        },
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
            text: 'Уже зарегистрированы?',
            link: {
                title: 'Войти',
                href: '/login',
            },
        },
    ]

    return (
        <>
            <Form headline='Регистрация' inputs={inputs} buttonText='Зарегистрироваться' />
            <FormFooter data={footerData} />
        </>
    )
}
