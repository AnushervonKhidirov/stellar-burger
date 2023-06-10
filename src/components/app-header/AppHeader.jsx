import PropTypes from 'prop-types'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './AppHeader.module.css'

function AppHeader() {
    return (
        <header>
            <div className='header_inner'>
                <div className={styles.header_side_left}>
                    <HeaderButton title='Конструктор' icon={<BurgerIcon type='primary' />} active />
                    <HeaderButton title='Лента заказов' icon={<ListIcon type='secondary' />} />
                </div>
                <div className={styles.header_side_center}>
                    <Logo />
                </div>
                <div className={styles.header_side_right}>
                    <HeaderButton title='Личный кабинет' icon={<ProfileIcon type='secondary' />} />
                </div>
            </div>
        </header>
    )
}

function HeaderButton({ title, icon, active }) {
    return (
        <button className={`${active ? styles.header_button_active : styles.header_button} pl-5 pr-5 pt-4 pb-4`}>
            <div className={styles.icon}>{icon}</div>
            <div className='text text_type_main-default'>{title}</div>
        </button>
    )
}

HeaderButton.propTypes = {
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
    icon: PropTypes.element,
}

export default AppHeader
