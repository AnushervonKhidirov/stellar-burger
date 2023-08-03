import type { ReactElement, FormEvent } from 'react'
import type { IFormInput, TSubmitFormFunc } from '../../../utils/interfaces'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import InputForm from '../input-form/InputForm'

import styles from './Form.module.css'

interface IFormData<T> {
    readonly headline: string
    readonly inputs: IFormInput[]
    readonly buttonText: string
    readonly submitFunc: TSubmitFormFunc<T>
    isDispatch?: boolean
}

interface ISendData {
    [key: string]: string
}

const Form = <T,>({
    headline,
    inputs,
    buttonText,
    submitFunc,
}: IFormData<T>): ReactElement | null => {
    const isAllProps = headline && inputs && buttonText

    function submitForm(e: FormEvent) {
        e.preventDefault()

        const dataToSend: ISendData = {}

        new FormData(e.target as HTMLFormElement).forEach((value, property) => {
            dataToSend[property] = value.toString()
        })

        submitFunc(dataToSend as T)
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
