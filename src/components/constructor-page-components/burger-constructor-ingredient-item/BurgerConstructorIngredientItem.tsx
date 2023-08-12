import type { FC } from 'react'
import type { Ingredient } from '../../../utils/interfaces'
import type { IConstructorIngDrag } from '../burger-constructor-ingredients/BurgerConstructorIngredients'

import { useRef } from 'react'
import { useAppDispatch } from '../../../utils/hooks'
import { removeIngredientFromConstructor } from '../../../services/store/constructor-ingredient-list/slice'
import { useDrag } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './BurgerConstructorIngredientItem.module.css'

const BurgerConstructorIngredientItem: FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
    const dispatch = useAppDispatch()
    const iconRef = useRef<HTMLDivElement>(null)
    const [{ isDragging }, dragRef] = useDrag<IConstructorIngDrag, unknown, {isDragging: boolean}>({
        type: 'ingredient_position',
        item: { ingredient, iconRef },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <li
            data-testid={`constructor_ingredient-${ingredient._id}`}
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

export default BurgerConstructorIngredientItem
