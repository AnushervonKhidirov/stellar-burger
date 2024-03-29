import type { FC } from 'react'
import type { IForgotPassword } from '../../utils/interfaces'
import { useLocation, useNavigate } from 'react-router-dom'

import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'

import { checkResponse, TServerResponse, TServerResponseMessage } from '../../utils/burger-api'
import { FORGET_PASSWORD_URL } from '../../utils/constants'

import { inputs, footerData } from './constant'

const ForgotPassword: FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const forgetPassword: (data: IForgotPassword) => void = async data => {
        if (data.email === '') {
            alert('Please enter your email')
        } else {
            const res = await fetch(FORGET_PASSWORD_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            })

            const result = await checkResponse<TServerResponse<TServerResponseMessage>>(res)

            if (result.success) {
                alert(result.message)
                localStorage.setItem('reset-password', 'true')
                navigate('/reset-password', { state: { from: location } })
            }
        }
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

export default ForgotPassword
