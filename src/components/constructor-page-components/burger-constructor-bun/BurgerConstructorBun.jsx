import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { positionText } from './constant'

import styles from './BurgerConstructorBun.module.css'

export default function BurgerConstructorBun({ position }) {
    const bun = useSelector(store => store.constructorIngredientList.bun)

    const classForEmpty = `constructor-element constructor-element_pos_${position}
        ${styles[`bun_${position}`]}
        ${styles.constructor_element}`

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

BurgerConstructorBun.propTypes = {
    position: PropTypes.oneOf(['top', 'bottom'])
}