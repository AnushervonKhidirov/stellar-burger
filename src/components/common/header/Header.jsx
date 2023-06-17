import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './Header.module.css'

function Header() {
    return (
        <header>
            <div className='header_inner'>
                <div className={styles.header_side_left}>
                    <HeaderNavLink link='/' title='Конструктор' Icon={BurgerIcon} />
                    <HeaderNavLink link='/order-list' title='Лента заказов' Icon={ListIcon} />
                </div>
                <div className={styles.header_side_center}>
                    primary
                    <Logo />
                </div>
                <div className={styles.header_side_right}>
                    <HeaderNavLink link='/profile' title='Личный кабинет' Icon={ProfileIcon} />
                </div>
            </div>
        </header>
    )
}

function HeaderNavLink({ link, title, Icon }) {
    return (
        <NavLink
            to={link}
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

HeaderNavLink.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    Icon: PropTypes.func.isRequired,
}

export default Header
