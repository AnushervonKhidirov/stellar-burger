import { useEffect, useState } from 'react'
import { ConstructorContext } from '../../../utils/context'
import { fetchIngredients } from '../../../utils/burger-api'
import BurgerConstructor from './burger-constructor/BurgerConstructor'
import BurgerIngredients from './burger-ingredients/BurgerIngredients'

function Constructor() {
    const [ingredientList, setIngredientList] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [peakedIngredientList, setPeakedIngredientList] = useState([])

    useEffect(() => {
        fetchIngredients().then(data => setIngredientList(data.map(elem => ({ ...elem, amount: 0, peakId: 0 }))))
    }, [])

    useEffect(() => {
        setTotalPrice(peakedIngredientList.reduce((acc, item) => item.type === 'bun' ? acc + (item.price * 2) : acc + item.price, 0))
    }, [peakedIngredientList])

    return (
        ingredientList && (
            <ConstructorContext.Provider
                value={{ ingredientList, setIngredientList, peakedIngredientList, setPeakedIngredientList, totalPrice }}
            >
                <div style={styles}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </ConstructorContext.Provider>
        )
    )
}

const styles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    height: '100%',
}

export default Constructor
