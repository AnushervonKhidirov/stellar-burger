import type { FC } from 'react'
import styles from './Loader.module.css'

const Loader: FC = () => {
    return (
        <div className={styles.loader_overlay}>
            <div className={styles.lds_ripple}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
