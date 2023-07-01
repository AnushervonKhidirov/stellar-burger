import styles from './ModalOverlay.module.css'

import type { ReactElement } from 'react'
import type { CloseModal } from '../../../utils/interfaces'

export default function ModalOverlay({ onClose }: { onClose: CloseModal }): ReactElement {
    return <div className={styles.modal_overlay} onClick={onClose}></div>
}
