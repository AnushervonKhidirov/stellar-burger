import type { ReactElement } from 'react'

import Form from '../../components/common/form/Form'
import FormFooter from '../../components/common/form-footer/FormFooter'
import { registerUser } from '../../services/user/action'

import { inputs, footerData } from './constant'

export default function Register(): ReactElement {
    return (
        <>
            <Form headline='Регистрация' inputs={inputs} buttonText='Зарегистрироваться' submitFunc={registerUser} />
            <FormFooter data={footerData} />
        </>
    )
}
