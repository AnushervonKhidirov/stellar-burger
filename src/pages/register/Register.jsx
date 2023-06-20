import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'
import { registerUser } from '../../store/profileSlice'

export default function Register() {
    const inputs = [
        {
            type: 'text',
            name: 'name',
            placeholder: 'Имя',
        },
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
            text: 'Уже зарегистрированы?',
            link: {
                title: 'Войти',
                href: '/login',
            },
        },
    ]

    return (
        <>
            <Form headline='Регистрация' inputs={inputs} buttonText='Зарегистрироваться' onSubmit={registerUser} />
            <FormFooter data={footerData} />
        </>
    )
}
