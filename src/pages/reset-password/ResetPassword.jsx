import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

export default function ForgotPassword() {
    const inputs = [
        {
            type: 'password',
            name: 'password',
            placeholder: 'Введите новый пароль',
        },
        {
            type: 'text',
            name: 'sms',
            placeholder: 'Введите код из письма',
        },
    ]

    const footerData = [
        {
            text: 'Вспомнили пароль?',
            link: {
                title: 'Войти',
                href: '/login',
            },
        },
    ]

    return (
        <>
            <Form headline='Восстановление пароля' inputs={inputs} buttonText='Сохранить' />
            <FormFooter data={footerData} />
        </>
    )
}
