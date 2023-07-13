import type { FC, ReactElement, FormEvent } from 'react'
import type { FormInput, TSubmitFormFunc } from '../../../utils/interfaces'

import { useAppDispatch } from '../../../utils/hooks'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import InputForm from '../input-form/InputForm'

import styles from './Form.module.css'

interface FormData {
    headline: string
    inputs: FormInput[]
    buttonText: string
    submitFunc: TSubmitFormFunc
    isDispatch?: boolean
}

interface SendData {
    [key: string]: string
}

const Form: FC<FormData> = ({
    headline,
    inputs,
    buttonText,
    submitFunc,
    isDispatch = true,
}): ReactElement | null => {
    const dispatch = useAppDispatch()
    const isAllProps = headline && inputs && buttonText

    function submitForm(e: FormEvent) {
        e.preventDefault()

        const dataToSend: SendData = {}

        new FormData(e.target as HTMLFormElement).forEach((value, property) => {
            dataToSend[property] = value.toString()
        })

        isDispatch ? dispatch(submitFunc(dataToSend)) : submitFunc(dataToSend)
    }

    return isAllProps ? (
        <form className={styles.form} onSubmit={submitForm}>
            <div className='text text_type_main-medium'>{headline}</div>
            {inputs.map(input => (
                <InputForm
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    key={input.type}
                />
            ))}
            <Button htmlType='submit' type='primary' size='medium'>
                {buttonText}
            </Button>
        </form>
    ) : null
}

export default Form
