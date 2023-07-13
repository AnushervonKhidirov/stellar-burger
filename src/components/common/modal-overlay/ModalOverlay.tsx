import type { FC } from 'react'
import type { TCloseModal } from '../../../utils/interfaces'

import styles from './ModalOverlay.module.css'

const ModalOverlay: FC<{ onClose: TCloseModal }> = ({ onClose }) => {
    return <div className={styles.modal_overlay} onClick={onClose}></div>
}

export default ModalOverlay
