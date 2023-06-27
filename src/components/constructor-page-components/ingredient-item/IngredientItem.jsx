import { Link, useLocation } from 'react-router-dom'
import { useDrag } from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { setDetail } from '../../../services/store/ingredientDetailSlice'
import { ingredientDataType } from '../../../utils/types'

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './IngredientItem.module.css'

export default function IngredientItem({ data }) {
    const dispatch = useDispatch()
    const location = useLocation()
    const amount = useSelector(store => store.constructorIngredientList.amounts[data._id])

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

IngredientItem.propTypes = {
    data: ingredientDataType,
}
