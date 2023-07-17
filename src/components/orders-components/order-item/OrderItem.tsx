import type { FC } from 'react'

import { v4 as uuid_v4 } from 'uuid'

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../../common/price/Price'
import ImageInBorder from '../../common/image-in-border/ImageInBorder'

import styles from './OrderItem.module.css'

type IOrderItem = IOrderHeader & IOrderHMain & IOrderTitle

type IOrderHMain = IImages & {
    readonly price: number
}

interface IImages {
    readonly ingredientImages: string[]
}

interface IOrderHeader {
    readonly orderNumber: string | number
    readonly date: Date
}

interface IOrderTitle {
    readonly title: string
    readonly status?: string
}

interface IMoreIng {
    readonly length: number
    readonly limit: number
    readonly index: number
}

const OrderItem: FC<IOrderItem> = ({
    orderNumber,
    date,
    title,
    price,
    ingredientImages,
    status,
}) => {
    return (
        <div className={styles.order_item}>
            <OrderHeader orderNumber={orderNumber} date={date} />
            <OrderTitle title={title} status={status} />
            <OrderMain ingredientImages={ingredientImages} price={price} />
        </div>
    )
}

const OrderHeader: FC<IOrderHeader> = ({ orderNumber, date }) => {
    return (
        <div className={styles.order_header}>
            <div className='text text_type_digits-default'>#{orderNumber}</div>
            <FormattedDate
                date={date}
                className='text text_type_main-default text_color_inactive'
            />
        </div>
    )
}

const OrderTitle: FC<IOrderTitle> = ({ title, status }) => {
    return (
        <div className='text text_type_main-default'>
            <div className='text_type_main-medium'>{title}</div>
            {status && (
                <div className={`${status === 'Выполнен' ? styles.order_done : ''} mt-2`}>
                    {status}
                </div>
            )}
        </div>
    )
}

const OrderMain: FC<IOrderHMain> = ({ ingredientImages, price }) => {
    return (
        <div className={styles.order_main}>
            <IngredientImages ingredientImages={ingredientImages} />
            <Price price={price} />
        </div>
    )
}

const IngredientImages: FC<IImages> = ({ ingredientImages }) => {
    const limit = 6

    return (
        <div className={styles.order_images}>
            {ingredientImages.map((image, index, allIng) =>
                index <= limit - 1 ? (
                    <ImageInBorder
                        style={{
                            transform: `translateX(${-20 * index}px)`,
                            zIndex: limit - index,
                        }}
                        image={image}
                        key={uuid_v4()}
                    >
                        <MoreIngredients length={allIng.length} limit={limit} index={index} />
                    </ImageInBorder>
                ) : null
            )}
        </div>
    )
}

const MoreIngredients: FC<IMoreIng> = ({ length, limit, index }) => {
    return length > limit && index === limit - 1 ? (
        <div className={`ext text_type_digits-default ${styles.more}`}>+{length - limit}</div>
    ) : null
}

export default OrderItem
