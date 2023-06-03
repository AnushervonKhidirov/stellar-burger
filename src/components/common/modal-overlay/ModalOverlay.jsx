import { useContext } from 'react'
import { ModalContext } from '../../../utils/context'

export default function ModalOverlay() {
    const { modalDispatch } = useContext(ModalContext)
    return <div style={styles} onClick={() => modalDispatch({ type: 'close' })}></div>
}

const styles = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    inset: 0,
}
