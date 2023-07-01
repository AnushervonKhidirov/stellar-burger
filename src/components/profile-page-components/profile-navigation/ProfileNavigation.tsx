import type { ReactElement } from 'react'

import { useAppDispatch } from '../../../utils/hooks'
import { logoutUser } from '../../../services/user/action'
import { NavLink, useLocation } from 'react-router-dom'

import styles from './ProfileNavigation.module.css'

interface NavigationData {
    navigationData: ProfileNavigationData[]
}

interface ProfileNavigationData {
    title: string
    href: string
    message: string
}

export default function ProfileNavigation({ navigationData }: NavigationData): ReactElement {
    const location = useLocation()

    const profileMessage: ProfileNavigationData | undefined = navigationData.find(
        (data: ProfileNavigationData): boolean => data.href === location.pathname
    )

    function setActive(isActive: boolean): string {
        return `text text_type_main-medium ${
            isActive ? styles.profile_navigation_link_active : styles.profile_navigation_link
        }`
    }

    return (
        <div className='mt-20'>
            <nav className={styles.profile_navigation}>
                {navigationData.map(navigation => (
                    <NavLink
                        to={navigation.href}
                        className={({ isActive }) => setActive(isActive)}
                        key={navigation.title}
                        end
                    >
                        {navigation.title}
                    </NavLink>
                ))}
                <LogOutButton />
            </nav>

            <div className='text text_type_main-default text_color_inactive mt-20'>
                {profileMessage?.message}
            </div>
        </div>
    )
}

function LogOutButton(): ReactElement {
    const dispatch = useAppDispatch()

    return (
        <div
            className={`${styles.profile_navigation_link} text text_type_main-medium text_color_inactive`}
            onClick={() => dispatch(logoutUser())}
        >
            Выход
        </div>
    )
}
