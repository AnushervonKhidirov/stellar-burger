import type { IFormInput } from '../../utils/interfaces'

export const inputs: IFormInput[] = [
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
