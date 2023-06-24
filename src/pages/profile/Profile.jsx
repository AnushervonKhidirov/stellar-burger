import { Outlet } from 'react-router-dom'
import ProfileNavigation from '../../components/profile-page-components/profile-navigation/ProfileNavigation'

import styles from './Profile.module.css'

export default function Profile() {
    const profileNavigationData = [
        {
            title: 'Профиль',
            href: '/profile',
            message: 'В этом разделе вы можете изменить свои персональные данные',
        },
        {
            title: 'История заказов',
            href: '/profile/orders',
            message: 'В этом разделе вы можете посмотреть свою историю заказов',
        },
    ]

    return (
        <div className={styles.profile}>
            <ProfileNavigation navigationData={profileNavigationData} />

            <div className={styles.profile_content}>
                <Outlet />
            </div>
        </div>
    )
}
