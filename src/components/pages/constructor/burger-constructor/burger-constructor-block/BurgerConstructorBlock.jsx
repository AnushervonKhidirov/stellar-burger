import PropTypes from 'prop-types'
import { ingredientDataTypes } from '../../../../../types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerConstructor.module.css'

function BurgerConstructorBlock({ list, setList }) {
    return (
        <div className={styles.ingredients_block}>
            <BurgerBun position='top' bun={list[0]} />
            <BurgerConstructor list={list} />
            <BurgerBun position='bottom' bun={list[0]} />
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

    return bun ? (
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

function BurgerConstructor(props) {
    return props.list ? (
        <ul className={`${styles.ingredient_list} custom-scroll`}>
            {props.list?.map((ingredient, index) => {
                return (
                    <li className={styles.ingredient_item} key={`${ingredient._id}-${index}`}>
                        <DragIcon type='primary' />
                        <BurgerConstructorItem ingredient={ingredient} />
                    </li>
                )
            })}
        </ul>
    ) : (
        <div className={`constructor-element ${styles.ingredient_list} ${styles.constructor_element}`}>
            Выберите начинку
        </div>
    )
}

function BurgerConstructorItem({ ingredient }) {
    return <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
}

BurgerConstructorBlock.propTypes = {
    list: PropTypes.arrayOf(ingredientDataTypes),
    setList: PropTypes.func,
}

BurgerBun.propTypes = {
    position: PropTypes.oneOf(['top', 'bottom']).isRequired,
    bun: ingredientDataTypes,
}

BurgerConstructor.propTypes = {
    list: PropTypes.arrayOf(ingredientDataTypes),
}

BurgerConstructorItem.propTypes = {
    ingredient: ingredientDataTypes.isRequired,
}

export default BurgerConstructorBlock
