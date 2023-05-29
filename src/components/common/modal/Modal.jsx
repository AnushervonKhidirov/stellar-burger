import { useEffect } from 'react'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'

function Modal(props) {
    function closeModal(e) {
        if (e.key === 'Escape') props.modalHandler()
    }
    
    useEffect(() => {
        document.addEventListener('keydown', closeModal)

        return () => {
            document.removeEventListener('keydown', closeModal)
        }
    }, [])

    return (
        <div className={styles.modal}>
            <ModalOverlay modalHandler={props.modalHandler} />
            <ModalContainer children={props.children} modalHandler={props.modalHandler} />
        </div>
    )
}

function ModalContainer({ children, modalHandler }) {
    return (
        <div className={styles.modal_container}>
            <CloseButton modalHandler={modalHandler} />
            <div className={styles.modal_container_inner}>{children}</div>
        </div>
    )
}

function CloseButton({ modalHandler }) {
    return (
        <div className={styles.close_button}>
            <CloseIcon type='primary' onClick={() => modalHandler()} />
        </div>
    )
}

Modal.propTypes = {
    modalHandler: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ])
}

ModalContainer.propTypes = {
    modalHandler: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ])
}

ModalOverlay.propTypes = {
    modalHandler: PropTypes.func.isRequired,
}

CloseButton.propTypes = {
    modalHandler: PropTypes.func.isRequired,
}



export default Modal
