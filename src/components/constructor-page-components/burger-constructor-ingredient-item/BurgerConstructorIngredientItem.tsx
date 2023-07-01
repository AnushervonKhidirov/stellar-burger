import type { ReactElement } from 'react'
import type { Ingredient } from '../../../utils/interfaces'

import { useRef } from 'react'
import { useAppDispatch } from '../../../utils/hooks'
import { removeIngredientFromConstructor } from '../../../services/store/constructorIngredientListSlice'
import { useDrag } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './BurgerConstructorIngredientItem.module.css'


export default function BurgerConstructorIngredientItem({
    ingredient,
}: {
    ingredient: Ingredient
}): ReactElement {
    const dispatch = useAppDispatch()
    const iconRef = useRef<HTMLDivElement>(null)
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
