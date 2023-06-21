import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../../store/profileSlice'

import ProfileNavigation from '../../components/profile-page-components/profile-navigation/ProfileNavigation'
import ProfileForm from '../../components/profile-page-components/profile-form/ProfileForm'

import styles from './Profile.module.css'

export default function Profile() {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(getUser())
    }, [dispatch])

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
                <ProfileForm />
            </div>
        </div>
    )
}
