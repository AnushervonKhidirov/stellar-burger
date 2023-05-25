import styles from './ContentWrapper.module.css'

function ContentWrapper(props) {
    return <section className={`${styles.content_wrapper} ${props.extraClass ? props.extraClass : ''}`}>{props.children}</section>
}

export default ContentWrapper
