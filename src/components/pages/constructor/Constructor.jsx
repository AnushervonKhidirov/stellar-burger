import { useEffect, useState } from 'react'

import BurgerConstructor from './burger-constructor/BurgerConstructor'
import BurgerIngredients from './burger-ingredients/BurgerIngredients'

import data from '../../../utils/data.json'

function Constructor({ modalHandler }) {
    const [burgerListData, setBurgerListData] = useState([
        {
            _id: '60666c42cc7b410027a1a9b1',
            name: 'Краторная булка N-200i',
            type: 'bun',
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        },
        {
            _id: '60666c42cc7b410027a1a9b9',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        },
        {
            _id: '60666c42cc7b410027a1a9b4',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        },
        {
            _id: '60666c42cc7b410027a1a9bc',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
        },
        {
            _id: '60666c42cc7b410027a1a9bb',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        }
    ])

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalPrice(
            burgerListData.reduce((prevProd, prod) => {
                return prevProd + prod.price
            }, 0)
        )
    }, [burgerListData])

    return (
        <div style={styles}>
            <BurgerConstructor data={data} modalHandler={modalHandler} />
            <BurgerIngredients
                burgerListData={burgerListData}
                setBurgerListData={setBurgerListData}
                totalPrice={totalPrice}
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
