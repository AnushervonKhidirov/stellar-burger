import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadIngredient } from '../../../store/ingredientListSlice'

import BurgerConstructor from './burger-constructor/BurgerConstructor'
import BurgerIngredients from './burger-ingredients/BurgerIngredients'

function Constructor() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIngredient())
    }, [dispatch])

    return (
        <div style={styles}>
            <BurgerIngredients />
            <BurgerConstructor />
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
