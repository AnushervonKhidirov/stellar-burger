import { useAppSelector } from '../../../utils/hooks'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { positionText } from './constant'

import styles from './BurgerConstructorBun.module.css'

import type { Ingredient } from '../../../utils/interfaces'

interface BunPosition {
    position: 'top' | 'bottom'
}

export default function BurgerConstructorBun({ position }: BunPosition) {
    const bun: Ingredient | null = useAppSelector(store => store.constructorIngredientList.bun)

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
