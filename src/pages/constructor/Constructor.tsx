import type { ReactElement } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BurgerIngredients from '../../components/constructor-page-components/burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../../components/constructor-page-components/burger-constructor/BurgerConstructor'

import styles from './Constructor.module.css'

function Constructor(): ReactElement {
    return (
        <div className={styles.burger_constructor}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </div>
    )
}

export default Constructor
