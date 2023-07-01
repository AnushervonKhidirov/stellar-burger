import type { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

import { API_URL, checkResponse } from '../../utils/burger-api'

import { inputs, footerData } from './constant'

interface ForgetData {
    email: string
}

export default function ForgotPassword(): ReactElement {
    const location = useLocation()
    const navigate = useNavigate()

    async function forgetPassword(data: ForgetData) {
        if (data.email === '') return alert('Please enter your email')

        const res = await fetch(`${API_URL}/password-reset`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })

        const result = await checkResponse(res)

        if (result.success) {
            alert(result.message)
            localStorage.setItem('reset-password', 'true')
            navigate('/reset-password', { state: { from: location } })
        }

        return result
    }

    return (
        <>
            <Form
                headline='Восстановление пароля'
                inputs={inputs}
                buttonText='Восстановить'
                submitFunc={forgetPassword}
                isDispatch={false}
            />
            <FormFooter data={footerData} />
        </>
    )
}
