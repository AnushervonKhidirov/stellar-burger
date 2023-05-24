import styles from './ContentWrapper.module.css'

function ContentWrapper(props) {
    return <div className={`${styles.content_wrapper} ${props.extraClass ? props.extraClass : ''}`}>{props.children}</div>
}

export default ContentWrapper
