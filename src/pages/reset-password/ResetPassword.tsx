import type { FC } from 'react'
import type { IResetPassword } from '../../utils/interfaces'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

import { checkResponse, TServerResponse, TServerResponseMessage } from '../../utils/burger-api'
import { RESET_PASSWORD_URL, CONSTRUCTOR_PAGE } from '../../utils/constants'

import { inputs, footerData } from './constant'

const ResetPassword: FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const resetPassword: (data: IResetPassword) => void = async data => {
        const res = await fetch(RESET_PASSWORD_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })

        const result = await checkResponse<TServerResponse<TServerResponseMessage>>(res)

        if (result.success) {
            alert(result.message)
            localStorage.removeItem('reset-password')
            navigate('/profile', { state: { from: location } })
        }
    }

    return localStorage.getItem('reset-password') ? (
        <>
            <Form
                headline='Восстановление пароля'
                inputs={inputs}
                buttonText='Сохранить'
                submitFunc={resetPassword}
                isDispatch={false}
            />
            <FormFooter data={footerData} />
        </>
    ) : (
        <Navigate to={CONSTRUCTOR_PAGE} />
    )
}

export default ResetPassword
