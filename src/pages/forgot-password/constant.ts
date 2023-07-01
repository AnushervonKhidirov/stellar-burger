import type { FormInput } from "../../utils/interfaces"

const inputs: FormInput[] = [
    {
        type: 'email',
        name: 'email',
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

export { inputs, footerData }