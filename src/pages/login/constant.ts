import type { FormInput } from "../../utils/interfaces"

const inputs: FormInput[] = [
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
        text: 'Вы - новый пользователь?',
        link: {
            title: 'Зарегистрироваться',
            href: '/register',
        },
    },
    {
        text: 'Забыли пароль?',
        link: {
            title: 'Восстановить пароль',
            href: '/forgot-password',
        },
    },
]

export { inputs, footerData }