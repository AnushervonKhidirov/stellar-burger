import PropTypes from 'prop-types'
import { footerFormItemType } from '../../../utils/types'
import { Link } from 'react-router-dom'

function FormFooterItem({ text, link }) {
    return (
        <p className='text text_type_main-default text_color_inactive m-0'>
            {text} <Link to={link.href} style={footerLinkStyle}>{link.title}</Link>
        </p>
    )
}

export default function FormFooter({ data }) {
    return data && (
        <div style={footerStyle} className='mt-20'>
            {data.map((item, index) => (
                <FormFooterItem text={item.text} link={item.link} key={index} />
            ))}
        </div>
    )
}

const footerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
}

const footerLinkStyle = {
    color: 'var(--colors-interface-accent)',
    textDecoration: 'none',
}

FormFooterItem.propTypes = footerFormItemType

FormFooter.propTypes = {
    data: PropTypes.arrayOf(footerFormItemType).isRequired,
}
