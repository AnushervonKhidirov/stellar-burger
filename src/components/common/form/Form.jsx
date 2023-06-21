import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { formInputType } from '../../../utils/types'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import InputForm from '../input-form/InputForm'

import styles from './Form.module.css'

export default function Form({ headline, inputs, buttonText, submitFunc }) {
    const dispatch = useDispatch()
    const isAllProps = headline && inputs && buttonText

    function submitForm(e) {
        e.preventDefault()

        const dataToSend = {}

        new FormData(e.target).forEach((value, property) => {
            dataToSend[property] = value
        })

        dispatch(submitFunc(dataToSend))
    }

    return isAllProps && (
        <form className={styles.form} onSubmit={submitForm}>
            <div className='text text_type_main-medium'>{headline}</div>
            {inputs.map(input => (
                <InputForm name={input.name} type={input.type} placeholder={input.placeholder} key={input.type} />
            ))}
            <Button htmlType='submit' type='primary' size='medium'>
                {buttonText}
            </Button>
        </form>
    )
}

Form.propTypes = {
    headline: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(formInputType).isRequired,
    buttonText: PropTypes.string.isRequired,
    submitFunc: PropTypes.func.isRequired,
}
