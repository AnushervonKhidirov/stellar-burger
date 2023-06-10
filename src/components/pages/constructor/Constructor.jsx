import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadIngredient } from '../../../store/ingredientListSlice'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BurgerConstructor from './burger-constructor/BurgerConstructor'
import BurgerIngredients from './burger-ingredients/BurgerIngredients'

function Constructor() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIngredient())
    }, [dispatch])

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
