import { useEffect, useState } from 'react'

import BurgerConstructor from './burger-constructor/BurgerConstructor'
import BurgerIngredients from './burger-ingredients/BurgerIngredients'

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients'

function Constructor({ modalHandler }) {
    const [burgerListData, setBurgerListData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        fetch(INGREDIENTS_URL)
        .then(res => res.json())
        .then(result => {
            if (result.success) setBurgerListData(result.data)
            else throw new Error()
        })
        .catch(err => alert(err))
    }, [])

    useEffect(() => {
        setTotalPrice(
            burgerListData.reduce((prevProd, prod) => {
                return prevProd + prod.price
            }, 0)
        )
    }, [burgerListData])

    return (
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
