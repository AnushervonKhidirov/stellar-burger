import type { FC, ReactElement, FormEvent } from 'react'
import type { IFormInput, TSubmitFormFunc } from '../../../utils/interfaces'

import { useAppDispatch } from '../../../utils/hooks'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import InputForm from '../input-form/InputForm'

import styles from './Form.module.css'

interface IFormData {
    readonly headline: string
    readonly inputs: IFormInput[]
    readonly buttonText: string
    readonly submitFunc: TSubmitFormFunc
    isDispatch?: boolean
}

interface ISendData {
    [key: string]: string
}

const Form: FC<IFormData> = ({
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

        const dataToSend: ISendData = {}

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
