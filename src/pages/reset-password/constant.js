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

export { inputs, footerData }