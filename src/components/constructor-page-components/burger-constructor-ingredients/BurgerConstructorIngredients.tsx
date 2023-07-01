import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { changeIngredientOrder } from '../../../services/store/constructorIngredientListSlice'

import { useDrop } from 'react-dnd'

import BurgerConstructorIngredientItem from '../burger-constructor-ingredient-item/BurgerConstructorIngredientItem'

import styles from './BurgerConstructorIngredients.module.css'

import type { ConstructorIngredient } from '../../../utils/interfaces'

interface ConstructorIngDrag {
    ingredient: ConstructorIngredient
    iconRef: any
}

export default function BurgerConstructorIngredients() {
    const dispatch = useAppDispatch()
    const ingredientList = useAppSelector(store => store.constructorIngredientList.ingredients)

    const [, dropRef] = useDrop({
        accept: 'ingredient_position',
        hover({ ingredient, iconRef }: ConstructorIngDrag, monitor) {
            if (!iconRef) return
            const ingredientElem = iconRef.current.parentElement
            const hoverBoundingRect = ingredientElem.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0

            // top
            if (hoverClientY + hoverMiddleY < hoverMiddleY - 10) {
                dispatch(
                    changeIngredientOrder({
                        ingredientList,
                        key: ingredient.key ? ingredient.key : '',
                        side: -1,
                    })
                )
            }

            // bottom
            if (hoverClientY > hoverMiddleY * 2 + 10) {
                dispatch(
                    changeIngredientOrder({
                        ingredientList,
                        key: ingredient.key ? ingredient.key : '',
                        side: 1,
                    })
                )
            }
        },
    })

    return ingredientList.length !== 0 ? (
        <ul className={`${styles.ingredient_list} custom-scroll`} ref={dropRef}>
            {ingredientList?.map(ingredient => (
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
