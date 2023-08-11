import type { FC } from 'react'
import type { Ingredient } from '../../../utils/interfaces'

import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDrag } from 'react-dnd'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { setDetail } from '../../../services/store/ingredient-detail/slice'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../../common/price/Price'

import { INGREDIENTS_PAGE } from '../../../utils/constants'
import { constructorIngredientSelector } from '../../../utils/selectors'

import styles from './IngredientItem.module.css'

const IngredientItem: FC<{ data: Ingredient }> = ({ data }) => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const allIngredients = useAppSelector(constructorIngredientSelector)
    const getAmount = useMemo(() => {
        if (data.type === 'bun') {
            return allIngredients.bun?._id === data._id ? 1 : 0
        } else {
            return allIngredients.ingredients.reduce((acc, item) => {
                if (item._id === data._id) ++acc
                return acc
            }, 0)
        }
    }, [data._id, data.type, allIngredients.ingredients, allIngredients.bun?._id])

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
    })

    return (
        <Link to={`${INGREDIENTS_PAGE}/${data._id}`} state={{ background: location }}>
            <li
                className={styles.ingredient_item}
                onClick={() => dispatch(setDetail(data))}
                ref={dragRef}
            >
                <img className={styles.image} src={data.image} alt={data.name} />
                <Price price={data.price} />
                <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
                {getAmount ? <Counter count={getAmount} size='default' /> : null}
            </li>
        </Link>
    )
}

export default IngredientItem
