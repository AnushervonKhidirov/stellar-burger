import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/ModalOverlay'
import styles from './Modal.module.css'

function Modal({ children, onClose, withUrl }) {
    const isModalOpened = useSelector(store => store.modal.isOpen)

    useEffect(() => {
        function modalCloseHandler(e) {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', modalCloseHandler)

        return () => {
            document.removeEventListener('keydown', modalCloseHandler)
        }
    }, [onClose])

    return (isModalOpened || withUrl) && (
        <div className={styles.modal}>
            <ModalOverlay onClose={onClose} />
            <ModalContainer onClose={onClose} children={children}></ModalContainer>
        </div>
    )
}

function ModalContainer({ children, onClose }) {
    const storeChildren = useSelector(store => store.modal.modalChildren)

    return (
        <div className={styles.modal_container}>
            <CloseButton onClose={onClose} />
            <div className={styles.modal_container_inner}>{children ? children : storeChildren}</div>
        </div>
    )
}

function CloseButton({ onClose }) {
    return (
        <div className={styles.close_button}>
            <CloseIcon type='primary' onClick={onClose} />
        </div>
    )
}

export default Modal
