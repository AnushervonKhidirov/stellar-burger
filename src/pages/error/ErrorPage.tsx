import type { FC } from 'react'
import styles from './ErrorPage.module.css'

const ErrorPage: FC = () => {
    return (
        <div
            className={`${styles.error_page} text text_type_digits-large text_color_inactive`}
            style={styles}
        >
            404
        </div>
    )
}

export default ErrorPage
