import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { setCurrentTab, setAutoScroll } from '../../../services/store/ingredientTabSlice'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { tabList } from './constant'

import styles from './BurgerNavigation.module.css'

import type { ReactElement } from 'react'

export default function BurgerNavigation(): ReactElement {
    const dispatch = useAppDispatch()
    const currentTab = useAppSelector(store => store.ingredientTab.currentTab)

    function tabHandler(value: string) {
        dispatch(setCurrentTab(value))
        dispatch(setAutoScroll(true))
    }

    return (
        <div>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <nav className={`${styles.navigation} mt-5`}>
                {tabList.map(tab => (
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
