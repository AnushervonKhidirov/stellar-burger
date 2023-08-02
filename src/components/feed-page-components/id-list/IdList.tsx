import type { FC } from 'react'
import { useEffect, useState } from 'react'

import styles from './IdList.module.css'

interface IIdList {
    readonly title: string
    readonly list: Array<string | number>
    readonly ready?: boolean
}

const IdList: FC<IIdList> = ({ title, list, ready }) => {
    const [splicedList, setSplicedList] = useState<(string | number)[]>([])

    useEffect(() => {
        if (list.length > 0) {
            if (list.length <= 15) {
                setSplicedList(list)
            } else {
                const newList = list.slice(0, 14)
                newList.push('...')
                setSplicedList(newList)
            }
        }
    }, [list])

    return (
        <div className={styles.id_list_wrapper}>
            <h3 className='text text_type_main-medium mb-6'>{title}:</h3>
            <ul className={`${styles.id_list} ${ready ? styles.id_list_ready : ''} text text_type_digits-default`}>
                {splicedList.map((orderId) => <li key={orderId}>{orderId}</li>)}
            </ul>
        </div>
    )
}

export default IdList