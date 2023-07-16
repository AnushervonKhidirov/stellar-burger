import type { FC } from 'react'

import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { setCurrentTab, setAutoScroll } from '../../../services/store/ingredientTabSlice'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { tabList } from './constant'
import styles from './BurgerNavigation.module.css'

const BurgerNavigation: FC = () => {
    const dispatch = useAppDispatch()
    const currentTab = useAppSelector(store => store.ingredientTab.currentTab)

    function tabHandler(value: string) {
        dispatch(setCurrentTab(value))
        dispatch(setAutoScroll(true))
    }

    return (
        <div>
            <nav className={styles.navigation}>
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

export default BurgerNavigation
