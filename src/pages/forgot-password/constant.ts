import type { FormInput } from '../../utils/interfaces'

export const inputs: FormInput[] = [
    {
        type: 'email',
        name: 'email',
        placeholder: 'E-mail',
    },
]

export const footerData = [
    {
        text: 'Вспомнили пароль?',
        link: {
            title: 'Войти',
            href: '/login',
        },
    },
]
