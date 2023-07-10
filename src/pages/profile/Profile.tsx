import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import ProfileNavigation from '../../components/profile-page-components/profile-navigation/ProfileNavigation'

import { profileNavigationData } from './constant'

import styles from './Profile.module.css'

const Profile: FC = () => {
    return (
        <div className={styles.profile}>
            <ProfileNavigation navigationData={profileNavigationData} />

            <div className={styles.profile_content}>
                <Outlet />
            </div>
        </div>
    )
}

export default Profile
