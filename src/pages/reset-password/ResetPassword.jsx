import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'
import { sendResetPassword } from '../../store/authSlice'

export default function ResetPassword() {
    const inputs = [
        {
            type: 'password',
            name: 'password',
            placeholder: 'Введите новый пароль',
        },
        {
            type: 'text',
            name: 'token',
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
            <Form headline='Восстановление пароля' inputs={inputs} buttonText='Сохранить' submitFunc={sendResetPassword} />
            <FormFooter data={footerData} />
        </>
    )
}
