import BurgerNavigation from './burget-navigation/BurgerNavigation'
import BurgerConstructorInner from './burger-constructor-inner/BurgerConstructorInner'

import styles from './BurgerConstructor.module.css'

// burgers' data
function BurgerConstructor({ data, modalHandler }) {
    return (
        <div className={styles.burger_constructor}>
            <HeaderConstructor />
            <BurgerConstructorInner data={data} modalHandler={modalHandler} />
        </div>
    )
}

function HeaderConstructor() {
    return (
        <div>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <BurgerNavigation />
        </div>
    )
}


export default BurgerConstructor
