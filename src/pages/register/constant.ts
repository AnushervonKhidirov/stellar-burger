import type { IFormInput } from "../../utils/interfaces"

const inputs: IFormInput[] = [
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

export { inputs, footerData }