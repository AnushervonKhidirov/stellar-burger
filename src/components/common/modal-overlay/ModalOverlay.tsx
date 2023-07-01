import type { ReactElement } from 'react'
import type { CloseModal } from '../../../utils/interfaces'

import styles from './ModalOverlay.module.css'


export default function ModalOverlay({ onClose }: { onClose: CloseModal }): ReactElement {
    return <div className={styles.modal_overlay} onClick={onClose}></div>
}
