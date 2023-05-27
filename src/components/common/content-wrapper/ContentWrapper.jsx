import PropTypes from 'prop-types'
import styles from './ContentWrapper.module.css'

function ContentWrapper(props) {
    return <section className={`${styles.content_wrapper} ${props.extraClass ? props.extraClass : ''}`}>{props.children}</section>
}

ContentWrapper.propTypes = {
    extraClass: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}

export default ContentWrapper
