import { useEffect, useContext } from 'react'
import { ModalContext } from '../../../utils/context'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/ModalOverlay'
import styles from './Modal.module.css'

function Modal() {
    const { modalDispatch } = useContext(ModalContext)

    useEffect(() => {
        function closeModal(e) {
            if (e.key === 'Escape') modalDispatch({ type: 'close' })
        }

        document.addEventListener('keydown', closeModal)

        return () => {
            document.removeEventListener('keydown', closeModal)
        }
    }, [modalDispatch])

    return (
        <div className={styles.modal}>
            <ModalOverlay />
            <ModalContainer />
        </div>
    )
}

function ModalContainer() {
    const { modalState } = useContext(ModalContext)

    return (
        <div className={styles.modal_container}>
            <CloseButton />
            <div className={styles.modal_container_inner}>{modalState.modalInner}</div>
        </div>
    )
}

function CloseButton() {
    const { modalDispatch } = useContext(ModalContext)

    return (
        <div className={styles.close_button}>
            <CloseIcon type='primary' onClick={() => modalDispatch({ type: 'close' })} />
        </div>
    )
}

export default Modal
