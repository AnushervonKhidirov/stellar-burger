import type { FC } from 'react'
import type { Ingredient } from '../../../utils/interfaces'

import { useCallback, useLayoutEffect, useState } from 'react'

import { useAppSelector } from '../../../utils/hooks'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../../common/price/Price'
import ImageInBorder from '../../common/image-in-border/ImageInBorder'

import styles from './FullOrderDetails.module.css'

interface IFullOrderDetails extends IOrderHeader {
    readonly number: number
    readonly ingredients: string[]
    readonly createdAt: string
}

interface IOrderHeader {
    readonly name: string
    readonly status: string
}

interface IOrderFooter {
    readonly date: Date
    readonly price: number
}

interface IngredientAmount extends Ingredient {
    amount: number
}

const FullOrderDetails: FC = () => {
    const ingredients = useAppSelector(store => store.ingredientList.ingredients)
    const [orderIngredient, setOrderIngredients] = useState<IngredientAmount[]>([])

    const details: IFullOrderDetails = {
        ingredients: [
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
        ],
        status: 'done',
        name: 'Бессмертный краторный spicy бургер',
        createdAt: '2023-05-04T04:31:54.858Z',
        number: 3013,
    }

    const filterIngredient = useCallback(() => {
        const arr: IngredientAmount[] = []
        const filteredIngredients: { [key: string]: IngredientAmount } = {}

        details.ingredients.forEach(id => {
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
    }, [details.ingredients, ingredients])

    useLayoutEffect(() => {
        setOrderIngredients(filterIngredient())
        // eslint-disable-next-line
    }, [ingredients])

    return (
        <div className={styles.details_wrapper}>
            <div className={`${styles.order_number} text text_type_digits-default mb-10`}>
                #{details.number}
            </div>
            <OrderHeader name={details.name} status={details.status} />
            <OrderIngredients ingredients={orderIngredient} />
            <OrderFooter date={new Date(details.createdAt)} price={510} />
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
            <ul className={styles.ingredient_list}>
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
