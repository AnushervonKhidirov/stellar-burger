import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

export default function ResetPassword() {
    const inputs = [
        {
            type: 'email',
            placeholder: 'E-mail',
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
            <Form headline='Восстановление пароля' inputs={inputs} buttonText='Восстановить' />
            <FormFooter data={footerData} />
        </>
    )
}
