import OrderBlock from './order-block/OrderBlock'
import BurgerConstructorBlock from './burger-constructor-block/BurgerConstructorBlock'
import styles from './BurgerConstructor.module.css'

function BurgerIngredients({ burgerListData, setBurgerListData, totalPrice, modalHandler }) {
    return (
        <div className={styles.ingredients}>
            <BurgerConstructorBlock list={burgerListData} setList={setBurgerListData} />
            <OrderBlock totalPrice={totalPrice} modalHandler={modalHandler} />
        </div>
    )
}

export default BurgerIngredients
