import { useSelector, useDispatch } from 'react-redux'
import { setCurrentTab, setAutoScroll } from '../../../../../store/ingredientTabSlice'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerNavigation() {
    const dispatch = useDispatch()
    const currentTabR = useSelector(store => store.ingredientTab.currentTab)

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
        dispatch(setCurrentTab(value))
        dispatch(setAutoScroll(true))
    }

    return (
        <nav style={{ display: 'flex' }} className='mt-5'>
            {tabs.map(tab => (
                <Tab value={tab.value} active={currentTabR === tab.value} onClick={tabHandler} key={tab.value}>
                    {tab.title}
                </Tab>
            ))}
        </nav>
    )
}

export default BurgerNavigation
