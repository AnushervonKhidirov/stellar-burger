import styles from './ModalOverlay.module.css'

export default function ModalOverlay({ onClose }) {
    return <div className={styles.modal_overlay} onClick={onClose}></div>
}
