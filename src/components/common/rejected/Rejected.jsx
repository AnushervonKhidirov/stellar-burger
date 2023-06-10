// import styles from './Rejected.module.css'

export default function Rejected() {
    return (
        <div style={styles}>
            <p className='text text_type_main-medium text_color_inactive'>
                Something went wrong<br />
                Please try again later
            </p>
        </div>
    )
}

const styles = {
    position: 'absolute',
    inset: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
}