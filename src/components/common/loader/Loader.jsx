import styles from './Loader.module.css'

export default function Loader() {
    return (
        <div className={styles.loader_overlay}>
            <div className={styles.lds_ripple}><div></div><div></div></div>
        </div>
    )
}