import { ingredientDataType } from '../../../utils/types'

import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeIngredientFromConstructor } from '../../../services/store/constructorIngredientListSlice'

import { useDrag } from 'react-dnd'

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

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
        <li style={{ ...ingredientItemStyle, opacity: isDragging ? 0 : 1 }} ref={dragRef}>
            <div style={{ cursor: 'move' }} ref={iconRef}>
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

const ingredientItemStyle = {
    marginRight: '8px',
    flexFrow: 'unset',
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
}
