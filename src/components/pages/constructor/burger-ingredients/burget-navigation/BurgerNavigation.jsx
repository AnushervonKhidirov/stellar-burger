import { useContext } from 'react'
import { IngredientContext } from '../../../../../utils/context'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerNavigation() {
    const { currentTab, setCurrentTab, setIsAutoscroll } = useContext(IngredientContext)

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

    function tabHandler(value) {
        setCurrentTab(value)
        setIsAutoscroll(true)
    }
    
    return (
        <nav style={{ display: 'flex' }} className='mt-5'>
            {tabs.map(tab => (
                <Tab value={tab.value} active={currentTab === tab.value} onClick={tabHandler} key={tab.value}>
                    {tab.title}
                </Tab>
            ))}
        </nav>
    )
}

export default BurgerNavigation
