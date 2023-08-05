import type { FC } from 'react'

import { useAppSelector } from '../../../utils/hooks'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { positionText } from './constant'
import { constructorIngredientSelector } from '../../../utils/selectors'

import styles from './BurgerConstructorBun.module.css'

interface IBunPosition {
    readonly position: 'top' | 'bottom'
}

const BurgerConstructorBun: FC<IBunPosition> = ({ position }) => {
    const { bun } = useAppSelector(constructorIngredientSelector)

    const classForEmpty = `constructor-element constructor-element_pos_${position}
        ${styles[`bun_${position}`]}
        ${styles.constructor_element}`

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

export default BurgerConstructorBun
