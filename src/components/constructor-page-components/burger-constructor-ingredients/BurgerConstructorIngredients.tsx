import type { FC } from 'react'
import type { Ingredient } from '../../../utils/interfaces'
import { RefObject } from 'react'

import { useDrop } from 'react-dnd'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { changeIngredientOrder } from '../../../services/store/constructorIngredientListSlice'
import BurgerConstructorIngredientItem from '../burger-constructor-ingredient-item/BurgerConstructorIngredientItem'
import { constructorIngredientSelector } from '../../../utils/selectors'

import styles from './BurgerConstructorIngredients.module.css'

export interface IConstructorIngDrag {
    readonly ingredient: Ingredient
    readonly iconRef: RefObject<HTMLDivElement>
}

const BurgerConstructorIngredients: FC = () => {
    const dispatch = useAppDispatch()
    const { ingredients } = useAppSelector(constructorIngredientSelector)

    const [, dropRef] = useDrop<IConstructorIngDrag>({
        accept: 'ingredient_position',
        hover({ ingredient, iconRef }, monitor) {
            if (!iconRef) return
            const ingredientElem = iconRef.current?.parentElement
            const hoverBoundingRect = ingredientElem?.getBoundingClientRect()

            if (!hoverBoundingRect) return
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect?.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0

            // top
            if (hoverClientY + hoverMiddleY < hoverMiddleY - 10) {
                dispatch(
                    changeIngredientOrder({
                        ingredients,
                        key: ingredient.key || '',
                        side: -1,
                    })
                )
            }

            // bottom
            if (hoverClientY > hoverMiddleY * 2 + 10) {
                dispatch(
                    changeIngredientOrder({
                        ingredients,
                        key: ingredient.key || '',
                        side: 1,
                    })
                )
            }
        },
    })

    return ingredients.length !== 0 ? (
        <ul className={`${styles.ingredient_list} custom-scroll`} ref={dropRef}>
            {ingredients?.map(ingredient => (
                <BurgerConstructorIngredientItem ingredient={ingredient} key={ingredient.key} />
            ))}
        </ul>
    ) : (
        <div
            className={`constructor-element ${styles.ingredient_list} ${styles.constructor_element} ${styles.empty_constructor}`}
        >
            Выберите начинку
        </div>
    )
}

export default BurgerConstructorIngredients
