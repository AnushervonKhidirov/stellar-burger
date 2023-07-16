import type { FC } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BurgerIngredients from '../../components/constructor-page-components/burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../../components/constructor-page-components/burger-constructor/BurgerConstructor'
import PageTitle from '../../components/common/page-title/PageTitle'

import styles from './Constructor.module.css'

const Constructor: FC = () => {
    return (
        <div className={styles.burger_constructor}>
            <DndProvider backend={HTML5Backend}>
                <PageTitle title='Соберите бургер' />
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </div>
    )
}

export default Constructor
