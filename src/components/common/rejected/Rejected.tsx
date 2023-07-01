import styles from './Rejected.module.css'
import type { ReactElement } from 'react'

export default function Rejected(): ReactElement {
    return (
        <div className={styles.rejected}>
            <p className='text text_type_main-medium text_color_inactive'>
                Something went wrong<br />
                Please try again later
            </p>
        </div>
    )
}
