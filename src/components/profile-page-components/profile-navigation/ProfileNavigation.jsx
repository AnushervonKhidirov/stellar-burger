import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../store/profileSlice'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './ProfileNavigation.module.css'

export default function ProfileNavigation({ navigationData }) {
    const location = useLocation()

    function setActive(isActive) {
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
                    >
                        {navigation.title}
                    </NavLink>
                ))}

                <LogOutButton />
            </nav>

            <div className='text text_type_main-default text_color_inactive mt-20'>
                {navigationData.find(data => data.href === location.pathname).message}
            </div>
        </div>
    )
}

function LogOutButton() {
    const dispatch = useDispatch()

    return (
        <div
            className='text text_type_main-medium text_color_inactive'
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(logoutUser())}
        >
            Выход
        </div>
    )
}

ProfileNavigation.propTypes = PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}).isRequired
