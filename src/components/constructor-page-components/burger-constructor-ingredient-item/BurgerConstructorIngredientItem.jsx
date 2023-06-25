import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeIngredientFromConstructor } from '../../../services/store/constructorIngredientListSlice'
import { useDrag } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { ingredientDataType } from '../../../utils/types'
import styles from './BurgerConstructorIngredientItem.module.css'

export default function BurgerConstructorIngredientItem({ ingredient }) {
    const dispatch = useDispatch()
    const iconRef = useRef(null)
    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient_position',
        item: { ingredient, iconRef },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <li
            style={{ opacity: isDragging ? 0 : 1 }}
            className={styles.constructor_item}
            ref={dragRef}
        >
            <div className={styles.drag_icon} ref={iconRef}>
                <DragIcon type='primary' />
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => dispatch(removeIngredientFromConstructor(ingredient))}
            />
        </li>
    )
}

BurgerConstructorIngredientItem.propTypes = {
    ingredient: ingredientDataType,
}
