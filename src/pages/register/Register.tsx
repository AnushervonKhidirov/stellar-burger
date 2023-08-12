import type { FC } from 'react'
import type { IRegisterData } from '../../utils/interfaces'

import { useAppDispatch } from '../../utils/hooks'
import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'
import { registerUser } from '../../services/store/user/action'

import { inputs, footerData } from './constant'

const Register: FC = () => {
    const dispatch = useAppDispatch()

    const submit = (data: IRegisterData) => {
        dispatch(registerUser(data))
    }

    return (
        <>
            <Form
                headline='Регистрация'
                inputs={inputs}
                buttonText='Зарегистрироваться'
                submitFunc={submit}
            />
            <FormFooter data={footerData} />
        </>
    )
}

export default Register
