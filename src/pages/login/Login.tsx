import type { FC } from 'react'

import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'
import { loginUser } from '../../services/store/user/action'

import { inputs, footerData } from './constant'
import { ILoginData } from '../../utils/interfaces'
import { useAppDispatch } from '../../utils/hooks'

const Login: FC = () => {
    const dispatch = useAppDispatch()

    const submit = (data: ILoginData) => {
        dispatch(loginUser(data))
    }

    return (
        <>
            <Form headline='Вход' inputs={inputs} buttonText='Войти' submitFunc={submit} />
            <FormFooter data={footerData} />
        </>
    )
}

export default Login
