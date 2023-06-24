import { ingredientDataType } from '../../../utils/types'

import { useSelector, useDispatch } from 'react-redux'
import { setDetail } from '../../../services/store/ingredientDetailSlice'
import { openModal } from '../../../services/store/modalSlice'
import { useDrag } from 'react-dnd'

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../../common/ingredient-details/IngredientDetails'

import styles from './IngredientItem.module.css'

export default function IngredientItem({ data }) {
    const dispatch = useDispatch()
    const amount = useSelector(store => store.constructorIngredientList.amounts[data._id])

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
    })

    function showIngredientProperty(data) {
        dispatch(setDetail(data))
        dispatch(openModal(<IngredientDetails />))
    }

    return (
        <li
            className={styles.ingredient_item}
            onClick={() => showIngredientProperty(data)}
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
    )
}

IngredientItem.propTypes = {
    data: ingredientDataType,
}
