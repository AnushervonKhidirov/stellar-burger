import PropTypes from 'prop-types'
import { formInputType } from '../../../utils/types'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import InputForm from '../input-form/InputForm'

import styles from './Form.module.css'

export default function Form({ headline, inputs, buttonText }) {
    const isAllProps = headline && inputs && buttonText

    return isAllProps && (
        <div className={styles.form}>
            <div className='text text_type_main-medium'>{headline}</div>
            {inputs.map(input => (
                <InputForm type={input.type} placeholder={input.placeholder} key={input.type} />
            ))}
            <Button htmlType='button' type='primary' size='medium'>
                {buttonText}
            </Button>
        </div>
    )
}

Form.propTypes = {
    headline: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(formInputType).isRequired,
    buttonText: PropTypes.string.isRequired,
}
