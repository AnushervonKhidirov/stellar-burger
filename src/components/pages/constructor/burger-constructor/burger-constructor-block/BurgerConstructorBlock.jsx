import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerConstructor.module.css'


function BurgerConstructorBlock({ list, setList }) {
    return (
        <div className={styles.ingredients_block}>
            <BurgerBun position='top' />
            <BurgerConstructor list={list} />
            <BurgerBun position='bottom' />
        </div>
    )
}

function BurgerBun(props) {
    const classForEmpty = `constructor-element constructor-element_pos_${props.position}
        ${styles[`bun_${props.position}`]}
        ${styles.constructor_element}`

    const positionText = {
        top: 'верх',
        bottom: 'низ',
    }

    return !props.name ? (
        <ConstructorElement
            type={props.position}
            isLocked={true}
            text={`${'Краторная булка N-200i'} (${positionText[props.position]})`}
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
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

export default BurgerConstructorBlock