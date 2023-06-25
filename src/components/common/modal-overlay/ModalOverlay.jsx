// import { useDispatch } from 'react-redux'
// import { closeModal } from '../../../services/store/modalSlice'
import { useNavigate } from 'react-router-dom'

export default function ModalOverlay() {
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    function closeModal() {
        // dispatch(closeModal())
        navigate(-1)
    }

    return <div style={styles} onClick={closeModal}></div>
}

const styles = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    inset: 0,
}
