import type { FC } from 'react'

import { useAppDispatch } from '../../../utils/hooks'
import { logoutUser } from '../../../services/store/user/action'
import { NavLink, useLocation } from 'react-router-dom'

import styles from './ProfileNavigation.module.css'

interface IProfileNavigation {
    readonly navigationData: IProfileMessage[]
}

interface IProfileMessage {
    readonly title: string
    readonly href: string
    readonly message: string
}

type TProfileMessage = IProfileMessage | undefined

const ProfileNavigation: FC<IProfileNavigation> = ({ navigationData }) => {
    const location = useLocation()

    const profileMessage: TProfileMessage = navigationData.find(
        data => data.href === location.pathname
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

const LogOutButton: FC = () => {
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

export default ProfileNavigation
