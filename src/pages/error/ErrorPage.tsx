import type { ReactElement } from 'react'
import styles from './ErrorPage.module.css'

export default function ErrorPage(): ReactElement {
    return <div className={`${styles.error_page} text text_type_digits-large text_color_inactive`} style={styles}>404</div>
}
