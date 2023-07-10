import type { FC } from 'react'
import styles from './Rejected.module.css'

const Rejected: FC = () => {
    return (
        <div className={styles.rejected}>
            <p className='text text_type_main-medium text_color_inactive'>
                Something went wrong<br />
                Please try again later
            </p>
        </div>
    )
}

export default Rejected