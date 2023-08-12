import { useEffect } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/ModalOverlay'
import styles from './Modal.module.css'

import type { FC, ReactElement } from 'react'
import type { TCloseModal } from '../../../utils/interfaces'

interface IModalProps {
    readonly children: ReactElement
    readonly onClose: TCloseModal
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
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
        <div className={styles.modal} data-testid='modal'>
            <ModalOverlay onClose={onClose} />
            <ModalContainer onClose={onClose} children={children}></ModalContainer>
        </div>
    )
}

const ModalContainer: FC<IModalProps> = ({ children, onClose }) => {
    return (
        <div className={styles.modal_container}>
            <CloseButton onClose={onClose} />
            <div className={styles.modal_container_inner}>{children}</div>
        </div>
    )
}

const CloseButton: FC<{ onClose: TCloseModal }> = ({ onClose }) => {
    return (
        <div className={styles.close_button} data-testid='close_modal'>
            <CloseIcon type='primary' onClick={onClose} />
        </div>
    )
}

export default Modal
