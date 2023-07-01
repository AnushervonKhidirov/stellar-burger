import type { ReactElement } from 'react'
import type { FooterText } from '../../../utils/interfaces'

import { Link, useLocation } from 'react-router-dom'

import styles from './FormFooter.module.css'

interface FooterData {
    data: FooterText[]
}

export default function FormFooter({ data }: FooterData): ReactElement {
    return (
        data && (
            <div className={`${styles.form_footer} mt-20`}>
                {data.map((item, index) => (
                    <FormFooterItem text={item.text} link={item.link} key={index} />
                ))}
            </div>
        )
    )
}

function FormFooterItem({ text, link }: FooterText) {
    const location = useLocation()

    return (
        <p className='text text_type_main-default text_color_inactive m-0'>
            {text}{' '}
            <Link to={link.href} state={{ from: location }} className={styles.footer_link}>
                {link.title}
            </Link>
        </p>
    )
}
