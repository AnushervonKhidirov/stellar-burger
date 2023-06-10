import OrderBlock from './order-block/OrderBlock'
import BurgerConstructorBlock from './burger-constructor-block/BurgerConstructorBlock'
import styles from './BurgerConstructor.module.css'

export default function BurgerConstructor() {
    return (
        <div className={styles.ingredients}>
            <BurgerConstructorBlock />
            <OrderBlock />
        </div>
    )
}
