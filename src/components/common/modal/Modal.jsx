import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'

function Modal(props) {
    return props.isActive && (
        <div className={styles.modal}>
            <ModalOverlay modalHandler={props.modalHandler} />
            <ModalContainer children={props.children} modalHandler={props.modalHandler} />
        </div>
    )
}

function ModalOverlay({ modalHandler }) {
    return <div className={styles.modal_overlay} onClick={modalHandler}></div>
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

export default Modal
