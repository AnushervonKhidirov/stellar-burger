import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { removeIngredientFromConstructor } from '../../../../../store/constructorIngredientListSlice'

import { ingredientDataTypes } from '../../../../../utils/types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerConstructor.module.css'

function BurgerConstructorBlock() {
    const constructorList = useSelector(store => store.constructorIngredientList)

    return (
        <div className={styles.ingredients_block}>
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

    return ingredientList && ingredientList.length !== 0 ? (
        <ul className={`${styles.ingredient_list} custom-scroll`}>
            {ingredientList?.map(ingredient => {
                return (
                    <li className={styles.ingredient_item} key={`${ingredient._id}_${ingredient.key}`}>
                        <DragIcon type='primary' />
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            handleClose={() => dispatch(removeIngredientFromConstructor(ingredient))}
                        />
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

BurgerBun.propTypes = {
    position: PropTypes.oneOf(['top', 'bottom']),
    bun: PropTypes.oneOfType([ingredientDataTypes, PropTypes.object]),
}

BurgerInnerConstructor.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientDataTypes).isRequired,
}

export default BurgerConstructorBlock
