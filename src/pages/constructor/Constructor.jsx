import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BurgerIngredients from '../../components/constructor-page-components/burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../../components/constructor-page-components/burger-constructor/BurgerConstructor'

function Constructor() {
    return (
        <div style={styles}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </div>
    )
}

const styles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    height: '100%',
}

export default Constructor
