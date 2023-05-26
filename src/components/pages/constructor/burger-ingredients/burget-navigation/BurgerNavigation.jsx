import { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerNavigation() {
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
        <nav style={{ display: 'flex' }} className='mt-5'>
            {tabs.map(tab => (
                <Tab value={tab.value} active={current === tab.value} onClick={setCurrent} key={tab.value}>
                    {tab.title}
                </Tab>
            ))}
        </nav>
    )
}

export default BurgerNavigation
