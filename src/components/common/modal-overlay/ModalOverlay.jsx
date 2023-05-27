export default function ModalOverlay({ modalHandler }) {
    return <div style={styles} onClick={modalHandler}></div>
}

const styles = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolut',
    inset: 0,
}
