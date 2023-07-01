import type { ReactElement } from 'react'
import type { Ingredient, ConstructorIngredient } from '../../../utils/interfaces'

import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDrag } from 'react-dnd'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { setDetail } from '../../../services/store/ingredientDetailSlice'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './IngredientItem.module.css'


export default function IngredientItem({ data }: { data: Ingredient }): ReactElement {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const allIngredients = useAppSelector(store => store.constructorIngredientList)
    const getAmount = useMemo((): number => {
        if (data.type === 'bun') {
            return allIngredients.bun?._id === data._id ? 1 : 0
        } else {
            return allIngredients.ingredients.reduce((acc: number, item: ConstructorIngredient) => {
                if (item._id === data._id) ++acc
                return acc
            }, 0)
        }
    }, [data._id, data.type, allIngredients.ingredients, allIngredients.bun?._id])

    const amount: number = getAmount

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
    })

    return (
        <Link to={`/ingredients/${data._id}`} state={{ background: location }}>
            <li
                className={styles.ingredient_item}
                onClick={() => dispatch(setDetail(data))}
                ref={dragRef}
            >
                <img className={styles.image} src={data.image} alt={data.name} />
                <div className={`${styles.price} text text_type_digits-default`}>
                    <span>{data.price}</span>
                    <CurrencyIcon type='primary' />
                </div>
                <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
                {amount ? <Counter count={amount} size='default' /> : null}
            </li>
        </Link>
    )
}
