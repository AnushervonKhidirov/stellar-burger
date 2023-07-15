import type { FC } from 'react'

import styles from './IdList.module.css'

interface IIdList {
    readonly title: string
    readonly list: Array<string | number>
    readonly ready?: boolean
}

const IdList: FC<IIdList> = ({ title, list, ready }) => {
    return (
        <div className={styles.id_list_wrapper}>
            <h3 className='text text_type_main-medium mb-6'>{title}:</h3>
            <ul className={`${styles.id_list} ${ready ? styles.id_list_ready : ''} text text_type_digits-default`}>
                {list.map(orderId => <li key={orderId}>{orderId}</li>)}
            </ul>
        </div>
    )
}

export default IdList