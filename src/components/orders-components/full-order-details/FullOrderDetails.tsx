import type { FC } from 'react'
import type { Ingredient, TOrderStatuses } from '../../../utils/interfaces'
import type { IOrderDetailState } from '../../../services/orders/slice'

import { useCallback, useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { getOrder } from '../../../services/orders/action'
import { clearOrder } from '../../../services/orders/slice'

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../../common/price/Price'
import ImageInBorder from '../../common/image-in-border/ImageInBorder'
import Loader from '../../common/loader/Loader'

import styles from './FullOrderDetails.module.css'

export interface IFullOrderDetails extends IOrderHeader {
    readonly number: number
    readonly ingredients: string[]
    readonly createdAt: string
}

interface IOrderHeader {
    readonly name: string
    readonly status: TOrderStatuses | null
}

interface IOrderFooter {
    readonly date: Date
    readonly price: number
}

interface IngredientAmount extends Ingredient {
    amount: number
}

const FullOrderDetails: FC = () => {
    const dispatch = useAppDispatch()
    const ingredients = useAppSelector(store => store.ingredientList.ingredients)
    const details = useAppSelector(store => store.orderDetails)
    const [orderIngredient, setOrderIngredients] = useState<IngredientAmount[]>([])
    const { orderNumber } = useParams()

    const getPrice = useMemo<(idList: string[]) => number>(
        () => idList => {
            let price: number = 0

            idList.forEach(ingId => {
                ingredients.forEach(ingredient => {
                    if (ingredient._id === ingId) price += ingredient.price
                })
            })

            return price
        },
        [ingredients]
    )

    const filterIngredient = useCallback(
        (order: IOrderDetailState) => {
            const arr: IngredientAmount[] = []
            const filteredIngredients: { [key: string]: IngredientAmount } = {}

            order.ingredientsId.forEach(id => {
                const ing = ingredients.find(ingredient => ingredient._id === id)

                if (ing) {
                    !filteredIngredients[id]
                        ? (filteredIngredients[id] = { ...ing, amount: 1 })
                        : filteredIngredients[id].amount++
                }
            })

            for (let key in filteredIngredients) {
                arr.push(filteredIngredients[key])
            }

            return arr
        },
        [ingredients]
    )

    useEffect(() => {
        orderNumber && dispatch(getOrder(orderNumber))
        return () => {
            dispatch(clearOrder())
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setOrderIngredients(filterIngredient(details))
    }, [details, filterIngredient])

    return details.isLoading ? (
        <Loader />
    ) : (
        <div className={styles.details_wrapper}>
            <div className={`${styles.order_number} text text_type_digits-default mb-10`}>
                #{details.number}
            </div>
            <OrderHeader name={details.name} status={details.status} />
            <OrderIngredients ingredients={orderIngredient} />
            <OrderFooter date={new Date(details.createdAt)} price={getPrice(details.ingredientsId)} />
        </div>
    )
}

const OrderHeader: FC<IOrderHeader> = ({ name, status }) => {
    return (
        <div>
            <h2 className='text text_type_main-medium'>{name}</h2>
            <div
                className={`${
                    status === 'done' ? styles.done_status : ''
                } text text_type_main-default mt-3`}
            >
                {status}
            </div>
        </div>
    )
}

const OrderIngredients: FC<{ ingredients: IngredientAmount[] }> = ({ ingredients }) => {
    return (
        <div className='mt-15'>
            <h2 className='text text_type_main-medium mb-6'>Состав:</h2>
            <ul className={`${styles.ingredient_list} custom-scroll`}>
                {ingredients.map(ingredient => (
                    <OrderIngredient ingredient={ingredient} key={ingredient._id} />
                ))}
            </ul>
        </div>
    )
}

const OrderIngredient: FC<{ ingredient: IngredientAmount }> = ({ ingredient }) => {
    return (
        <li className={styles.ingredient_item}>
            <ImageInBorder image={ingredient.image_mobile} />
            <div className='text text_type_main-default'>{ingredient.name}</div>
            <div className={styles.price_block}>
                <span className='text text_type_digits-default'>{ingredient.amount} x </span>
                <Price price={ingredient.price} />
            </div>
        </li>
    )
}

const OrderFooter: FC<IOrderFooter> = ({ date, price }) => {
    return (
        <div className={`${styles.order_footer} mt-10`}>
            <FormattedDate
                className='text text_type_main-default text_color_inactive'
                date={date}
            />
            <Price price={price} />
        </div>
    )
}

export default FullOrderDetails
