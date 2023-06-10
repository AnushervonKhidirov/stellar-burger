import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    changeIngredientOrder,
} from '../../../../../store/constructorIngredientListSlice'

import { useDrag, useDrop } from 'react-dnd'

import { ingredientDataTypes } from '../../../../../utils/types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerConstructor.module.css'

function BurgerConstructorBlock() {
    const dispatch = useDispatch()
    const constructorList = useSelector(store => store.constructorIngredientList)

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            dispatch(addIngredientToConstructor(ingredient))
        },
    })

    return (
        <div className={styles.ingredients_block} ref={dropRef}>
            <BurgerBun position='top' bun={constructorList.bun} />
            <BurgerInnerConstructor ingredientList={constructorList.ingredients} />
            <BurgerBun position='bottom' bun={constructorList.bun} />
        </div>
    )
}

function BurgerBun({ position, bun }) {
    const classForEmpty = `constructor-element constructor-element_pos_${position}
        ${styles[`bun_${position}`]}
        ${styles.constructor_element}`

    const positionText = {
        top: 'верх',
        bottom: 'низ',
    }

    return bun._id ? (
        <ConstructorElement
            type={position}
            isLocked={true}
            text={`${bun.name} (${positionText[position]})`}
            price={bun.price}
            thumbnail={bun.image}
        />
    ) : (
        <div className={classForEmpty}>Выберите булки</div>
    )
}

function BurgerInnerConstructor({ ingredientList }) {
    const dispatch = useDispatch()
    const allIngredients = useSelector(store => store.constructorIngredientList.ingredients)

    const [, dropRef] = useDrop({
        accept: 'ingredient_position',
        hover({ingredient, iconRef}, monitor) {
            if (!iconRef) return
            const ingredientElem = iconRef.current.parentElement
            const hoverBoundingRect = ingredientElem.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            // top
            if (hoverClientY + hoverMiddleY < hoverMiddleY - 10) {
                dispatch(changeIngredientOrder({allIngredients, id: ingredient._id, key: ingredient.key, side: -1}))
            }

            // bottom
            if (hoverClientY > hoverMiddleY * 2 + 10) {
                dispatch(changeIngredientOrder({allIngredients, id: ingredient._id, key: ingredient.key, side: 1}))
            }
        },
    })

    return ingredientList?.length !== 0 ? (
        <ul className={`${styles.ingredient_list} custom-scroll`} ref={dropRef}>
            {ingredientList?.map((ingredient, index) => (
                <ConstructorIngredientItem
                    ingredient={ingredient}
                    index={index}
                    key={`${ingredient._id}_${ingredient.key}`}
                />
            ))}
        </ul>
    ) : (
        <div className={`constructor-element ${styles.ingredient_list} ${styles.constructor_element}`}>
            Выберите начинку
        </div>
    )
}

function ConstructorIngredientItem({ ingredient, index }) {
    const dispatch = useDispatch()
    const iconRef = useRef(null)
    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient_position',
        item: {ingredient, index, iconRef},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <li className={styles.ingredient_item} style={{ opacity: isDragging ? 0 : 1}} ref={dragRef}>
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

BurgerBun.propTypes = {
    position: PropTypes.oneOf(['top', 'bottom']),
    bun: PropTypes.oneOfType([ingredientDataTypes, PropTypes.object]),
}

BurgerInnerConstructor.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientDataTypes).isRequired,
}

export default BurgerConstructorBlock
