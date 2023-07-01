import type { ReactElement } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

import { API_URL, checkResponse } from '../../utils/burger-api'

import { inputs, footerData } from './constant'

interface ResetData {
    password: string
    token: string
}


export default function ResetPassword(): ReactElement {
    const location = useLocation()
    const navigate = useNavigate()

    async function resetPassword(data: ResetData) {
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
