import { useSelector, useDispatch } from 'react-redux'
import { setCurrentTab, setAutoScroll } from '../../../services/store/ingredientTabSlice'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerNavigation() {
    const dispatch = useDispatch()
    const currentTab = useSelector(store => store.ingredientTab.currentTab)

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
        <div>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <nav style={{ display: 'flex' }} className='mt-5'>
                {tabs.map(tab => (
                    <Tab
                        value={tab.value}
                        active={currentTab === tab.value}
                        onClick={tabHandler}
                        key={tab.value}
                    >
                        {tab.title}
                    </Tab>
                ))}
            </nav>
        </div>
    )
}
