import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../../store/modalSlice'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/ModalOverlay'
import styles from './Modal.module.css'

function Modal() {
    const isOpened = useSelector(store => store.modal.isOpen)
    const dispatch = useDispatch()

    useEffect(() => {
        function modalCloseHandler(e) {
            if (e.key === 'Escape') dispatch(closeModal())
        }

        document.addEventListener('keydown', modalCloseHandler)

        return () => {
            document.removeEventListener('keydown', modalCloseHandler)
        }
    }, [dispatch])

    return isOpened && (
        <div className={styles.modal}>
            <ModalOverlay />
            <ModalContainer />
        </div>
    )
}

function ModalContainer() {
    const children = useSelector(store => store.modal.modalChildren)

    return (
        <div className={styles.modal_container}>
            <CloseButton />
            <div className={styles.modal_container_inner}>{children}</div>
        </div>
    )
}

function CloseButton() {
    const dispatch = useDispatch()

    return (
        <div className={styles.close_button}>
            <CloseIcon type='primary' onClick={() => dispatch(closeModal())} />
        </div>
    )
}

export default Modal
