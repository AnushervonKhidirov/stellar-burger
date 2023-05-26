import OrderBlock from './order-block/OrderBlock'
import BurgerIngredientsBlock from './burger-ingredients-block/BurgerIngredientsBlock'
import styles from './BurgerIngredients.module.css'

function BurgerIngredients({ burgerListData, setBurgerListData, totalPrice, modalHandler }) {
    return (
        <div className={styles.ingredients}>
            <BurgerIngredientsBlock list={burgerListData} setList={setBurgerListData} />
            <OrderBlock totalPrice={totalPrice} modalHandler={modalHandler} />
        </div>
    )
}

export default BurgerIngredients
