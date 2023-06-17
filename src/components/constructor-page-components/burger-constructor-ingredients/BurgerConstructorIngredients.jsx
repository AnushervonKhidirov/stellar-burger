import PropTypes from 'prop-types'
import { ingredientDataType } from '../../../utils/types'

import { useSelector, useDispatch } from 'react-redux'
import { changeIngredientOrder } from '../../../store/constructorIngredientListSlice'

import { useDrop } from 'react-dnd'

import BurgerConstructorIngredientItem from '../burger-constructor-ingredient-item/BurgerConstructorIngredientItem'

import styles from './BurgerConstructorIngredients.module.css'

export default function BurgerConstructorIngredients() {
    const dispatch = useDispatch()
    const ingredientList = useSelector(store => store.constructorIngredientList.ingredients)

    const [, dropRef] = useDrop({
        accept: 'ingredient_position',
        hover({ ingredient, iconRef }, monitor) {
            if (!iconRef) return
            const ingredientElem = iconRef.current.parentElement
            const hoverBoundingRect = ingredientElem.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            // top
            if (hoverClientY + hoverMiddleY < hoverMiddleY - 10) {
                dispatch(
                    changeIngredientOrder({
                        ingredientList,
                        key: ingredient.key,
                        side: -1,
                    })
                )
            }

            // bottom
            if (hoverClientY > hoverMiddleY * 2 + 10) {
                dispatch(
                    changeIngredientOrder({
                        ingredientList,
                        key: ingredient.key,
                        side: 1,
                    })
                )
            }
        },
    })

    return ingredientList?.length !== 0 ? (
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

BurgerConstructorIngredients.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientDataType).isRequired,
}
