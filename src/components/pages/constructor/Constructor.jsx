import { useEffect, useState } from 'react'
import { getIngredients } from '../../../utils/burger-api'
import BurgerConstructor from './burger-constructor/BurgerConstructor'
import BurgerIngredients from './burger-ingredients/BurgerIngredients'

function Constructor({ modalHandler }) {
    const [burgerListData, setBurgerListData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        getIngredients().then(data => setBurgerListData(data))
    }, [])

    useEffect(() => {
        setTotalPrice(
            burgerListData.reduce((prevProd, prod) => {
                return prevProd + prod.price
            }, 0)
        )
    }, [burgerListData])

    return burgerListData.length && (
        <div style={styles}>
            <BurgerIngredients data={burgerListData} modalHandler={modalHandler} />
            <BurgerConstructor
                burgerListData={burgerListData}
                setBurgerListData={setBurgerListData}
                totalPrice={totalPrice}
                modalHandler={modalHandler}
            />
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
