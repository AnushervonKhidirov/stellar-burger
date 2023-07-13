import type { IFormInput } from '../../utils/interfaces'

export const inputs: IFormInput[] = [
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

export const footerData = [
    {
        text: 'Вспомнили пароль?',
        link: {
            title: 'Войти',
            href: '/login',
        },
    },
]
