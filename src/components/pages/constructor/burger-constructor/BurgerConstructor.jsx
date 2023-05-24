import { useState } from 'react'
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './BurgerConstructor.module.css'

// burgers' data
function BurgerConstructor({ data }) {
    return (
        <div className={styles.burger_constructor}>
            <HeaderConstructor />
            <BurgerConstructorInner data={data} />
        </div>
    )
}

function HeaderConstructor() {
    return (
        <div>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <BurgerConstructorNavigation />
        </div>
    )
}

function BurgerConstructorNavigation() {
    const [current, setCurrent] = useState('bun')
    const tabs = [
        {
            value: 'bun',
            title: 'Булки',
        },
        {
            value: 'sauce',
            title: 'Соусы',
        },
        {
            value: 'main',
            title: 'Начинки',
        },
    ]

    return (
        <div style={{ display: 'flex' }} className='mt-5'>
            {tabs.map(tab => (
                <Tab value={tab.value} active={current === tab.value} onClick={setCurrent} key={tab.value}>
                    {tab.title}
                </Tab>
            ))}
        </div>
    )
}

function BurgerConstructorInner({ data }) {
    const constructorData = changeStructure(data)

    return (
        <div className={`${styles.constructor_inner} custom-scroll`}>
            {constructorData.map((item, index) => (
                <ConstructorTypeList type={item.type} list={item.list} key={index} />
            ))}
        </div>
    )
}

function ConstructorTypeList({ type, list }) {
    const headline = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки',
    }

    return (
        <div className={styles.constructor_type_list} data-title={type}>
            <div className='headline text text_type_main-medium'>{headline[type]}</div>
            <ul className={`${styles.constructor_elements} pl-4 pr-4 pt-6 pb-10`}>
                {list.map(item => (
                    <BurgerElement data={item} key={item._id} />
                ))}
            </ul>
        </div>
    )
}

function BurgerElement({ data }) {
    const { image, price, name } = data

    return (
        <li className={styles.list_item}>
            <img className={styles.image} src={image} alt={name} />
            <div className={`${styles.price} text text_type_digits-default`}>
                <span>{price}</span>
                <CurrencyIcon type='primary' />
            </div>
            <div className={`${styles.name} ext text_type_main-default`}>{name}</div>
        </li>
    )
}

function changeStructure(arr) {
    const newArr = [
        {
            type: 'bun',
            list: [],
        },
        {
            type: 'sauce',
            list: [],
        },
        {
            type: 'main',
            list: [],
        },
    ]

    arr.forEach(item => {
        newArr.find(elem => elem.type === item.type).list.push(item)
    })

    return newArr
}

export default BurgerConstructor
