import type { FC } from 'react'
import type { TOrderStatuses } from '../../../utils/interfaces'

import { useAppSelector } from '../../../utils/hooks'
import { v4 as uuidV4 } from 'uuid'

import { Link } from 'react-router-dom'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../../common/price/Price'
import ImageInBorder from '../../common/image-in-border/ImageInBorder'

import styles from './OrderItem.module.css'

type IOrderItem = IOrderHeader & IListIng & IOrderTitle

interface IOrderHeader {
    readonly orderNumber: string | number
    readonly date: Date
}

interface IOrderTitle {
    readonly title: string
    readonly status?: TOrderStatuses
    readonly showStatus?: boolean
}

interface IMoreIng {
    readonly length: number
    readonly limit: number
    readonly index: number
}

interface IListIng {
    readonly ingredients: string[]
}

const OrderItem: FC<IOrderItem> = ({ orderNumber, date, title, ingredients, status, showStatus }) => {
    return (
        <Link to={orderNumber.toString()} className={styles.order_item}>
            <OrderHeader orderNumber={orderNumber} date={date} />
            <OrderTitle title={title} status={status} showStatus={showStatus} />
            <OrderMain ingredients={ingredients} />
        </Link>
    )
}

const OrderHeader: FC<IOrderHeader> = ({ orderNumber, date }) => {
    return (
        <div className={styles.order_header}>
            <div className='text text_type_digits-default'>#{orderNumber}</div>
            <FormattedDate
                date={new Date(date)}
                className='text text_type_main-default text_color_inactive'
            />
        </div>
    )
}

const OrderTitle: FC<IOrderTitle> = ({ title, status, showStatus }) => {
    const statusTranslate = {
        created: 'Создан',
        pending: 'Готовится',
        done: 'Выполнен',
    }

    return (
        <div className='text text_type_main-default'>
            <div className='text_type_main-medium'>{title}</div>
            {status && showStatus && (
                <div className={`${status === 'done' ? styles.order_done : ''} mt-2`}>
                    {statusTranslate[status]}
                </div>
            )}
        </div>
    )
}

const OrderMain: FC<IListIng> = ({ ingredients }) => {
    const allIngredients = useAppSelector(store => store.ingredientList.ingredients)
    const ingredientList: string[] = []
    let price: number = 0

    ingredients.forEach(ingId => {
        allIngredients.forEach(ingredient => {
            if (ingredient._id === ingId) {
                ingredientList.push(ingredient.image)
                price += ingredient.price
            }
        })
    })

    return (
        <div className={styles.order_main}>
            <IngredientImages ingredientImages={ingredientList} limit={6} />
            <Price price={price} />
        </div>
    )
}

const IngredientImages: FC<{ ingredientImages: string[]; limit: number }> = ({
    ingredientImages,
    limit,
}) => {
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
                        key={uuidV4()}
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
