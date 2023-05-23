import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'

function BurgerIngredients({ burgerListData, setBurgerListData, totalPrice }) {
    return (
        <div className={styles.ingredients}>
            <BurgerIngredientsList list={burgerListData} setList={setBurgerListData} />
            <OrdreBlock totalPrice={totalPrice} />
        </div>
    )
}

function OrdreBlock({ totalPrice }) {
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

function BurgerIngredientsList({ list, setList }) {
    return (
        <div className={styles.ingredientList}>
            {list.map(ingredient => {
                return (
                    <ConstructorElement
                        extraClass={styles.ingredient_item}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        key={`${ingredient._id} ${ingredient.position}`}
                        type={ingredient.position}
                        isLocked={ingredient.isLocked}
                    />
                )
            })}
            {/* <ConstructorElement
                type='top'
                isLocked={true}
                text='Краторная булка N-200i (верх)'
                price={200}
                thumbnail={image}
            />
            <ConstructorElement
                text='Краторная булка N-200i (верх)'
                price={50}
                thumbnail={image}
            />
            <ConstructorElement
                type='bottom'
                isLocked={true}
                text='Краторная булка N-200i (низ)'
                price={200}
                thumbnail={image}
            /> */}
        </div>
    )
}

export default BurgerIngredients
