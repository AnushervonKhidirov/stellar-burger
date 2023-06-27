import styles from './Rejected.module.css'

export default function Rejected() {
    return (
        <div className={styles.rejected}>
            <p className='text text_type_main-medium text_color_inactive'>
                Something went wrong<br />
                Please try again later
            </p>
        </div>
    )
}
