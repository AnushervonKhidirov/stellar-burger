import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'

function BurgerIngredients({ burgerListData, setBurgerListData, totalPrice }) {
    return (
        <div className={styles.ingredients}>
            <BurgerIngredientsBlock list={burgerListData} setList={setBurgerListData} />
            <OrderBlock totalPrice={totalPrice} />
        </div>
    )
}

function OrderBlock({ totalPrice }) {
    return (
        <div className={styles.order_block}>
            <TotalPrice totalPrice={totalPrice} />
            <Button htmlType='button' type='primary' size='large'>
                Нажми на меня
            </Button>
        </div>
    )
}

function TotalPrice({ totalPrice }) {
    return (
        <div className={styles.total_price}>
            <span className='text text_type_digits-medium'>{totalPrice}</span>
            <CurrencyIcon type='primary' />
        </div>
    )
}

function BurgerIngredientsBlock({ list, setList }) {
    return (
        <div className={styles.ingredients_block}>
            <BurgerBun position='top' />
            <BurgerIngredientList list={list} />
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
        top: 'низ',
    }

    return props.name ? (
        <ConstructorElement
            extraClass={styles.ingredient_item}
            type={props.position}
            isLocked={true}
            text={`${'Краторная булка N-200i'} ${positionText[props.position]}`}
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
        />
    ) : (
        <div className={classForEmpty}>Выберите булки</div>
    )
}

function BurgerIngredientList(props) {
    return props.list ? (
        <ul className={`${styles.ingredient_list} custom-scroll`}>
            {props.list?.map(ingredient => {
                return (
                    <li key={ingredient._id}>
                        <BurgerIngredientItem ingredient={ingredient} />
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

function BurgerIngredientItem({ ingredient }) {
    return (
        <ConstructorElement
            extraClass={styles.ingredient_item}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
        />
    )
}

export default BurgerIngredients
