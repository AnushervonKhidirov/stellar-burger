import { useEffect } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/ModalOverlay'
import styles from './Modal.module.css'

import type { CloseModal } from '../../../utils/interfaces'

interface ModalProps {
    children: any
    onClose: CloseModal
}

function Modal({ children, onClose }: ModalProps) {
    useEffect(() => {
        function modalCloseHandler(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', modalCloseHandler)

        return () => {
            document.removeEventListener('keydown', modalCloseHandler)
        }
    }, [onClose])

    return (
        <div className={styles.modal}>
            <ModalOverlay onClose={onClose} />
            <ModalContainer onClose={onClose} children={children}></ModalContainer>
        </div>
    )
}

function ModalContainer({ children, onClose }: ModalProps) {
    return (
        <div className={styles.modal_container}>
            <CloseButton onClose={onClose} />
            <div className={styles.modal_container_inner}>{children}</div>
        </div>
    )
}

function CloseButton({ onClose }: { onClose: CloseModal }) {
    return (
        <div className={styles.close_button}>
            <CloseIcon type='primary' onClick={onClose} />
        </div>
    )
}

export default Modal
