import type { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import type { ReactElement } from 'react'

import { NavLink, useLocation } from 'react-router-dom'
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './Header.module.css'

interface HeaderNavigation {
    link: string
    title: string
    Icon: ({ type }: TIconProps) => ReactElement
}

function Header(): ReactElement {
    return (
        <header>
            <div className='header_inner'>
                <div className={styles.header_side_left}>
                    <HeaderNavLink link='/' title='Конструктор' Icon={BurgerIcon} />
                    <HeaderNavLink link='/feed' title='Лента заказов' Icon={ListIcon} />
                </div>
                <div className={styles.header_side_center}>
                    <Logo />
                </div>
                <div className={styles.header_side_right}>
                    <HeaderNavLink link='/profile' title='Личный кабинет' Icon={ProfileIcon} />
                </div>
            </div>
        </header>
    )
}

function HeaderNavLink({ link, title, Icon }: HeaderNavigation) {
    const location = useLocation()

    return (
        <NavLink
            to={link}
            state={{ from: location }}
            className={({ isActive }) => {
                return `${
                    isActive ? styles.header_button_active : styles.header_button
                } pl-5 pr-5 pt-4 pb-4`
            }}
        >
            {({ isActive }) => (
                <>
                    <div className={styles.icon}>
                        <Icon type={isActive ? 'primary' : 'secondary'} />
                    </div>
                    <div className='text text_type_main-default'>{title}</div>
                </>
            )}
        </NavLink>
    )
}

export default Header
