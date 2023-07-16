import type { FC } from 'react'
import styles from './PageTitle.module.css'

const PageTitle: FC<{ title: string }> = ({ title }) => {
    return <h1 className={`${styles.page_title} text text_type_main-large`}>{title}</h1>
}

export default PageTitle
