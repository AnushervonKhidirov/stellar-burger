import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

import { API_URL, checkResponse } from '../../utils/burger-api'


export default function ResetPassword() {
    const location = useLocation()
    const navigate = useNavigate()

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

    async function resetPassword(data) {
        const res = await fetch(`${API_URL}/password-reset/reset`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
    
        const result = await checkResponse(res)

        if (result.success) {
            alert(result.message)
            localStorage.removeItem('reset-password')
            navigate('/profile', { state: { from: location } })
        }

        return result
    }

    return localStorage.getItem('reset-password') ? 
        (
            <>
                <Form headline='Восстановление пароля' inputs={inputs} buttonText='Сохранить' submitFunc={resetPassword} isDispatch={false} />
                <FormFooter data={footerData} />
            </>
        ) : <Navigate to='/' /> 
}
