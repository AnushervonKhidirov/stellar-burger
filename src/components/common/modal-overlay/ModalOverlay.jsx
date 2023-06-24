import { useDispatch } from 'react-redux'
import { closeModal } from '../../../services/store/modalSlice'

export default function ModalOverlay() {
    const dispatch = useDispatch()
    return <div style={styles} onClick={() => dispatch(closeModal())}></div>
}

const styles = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    inset: 0,
}
