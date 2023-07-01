import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import ProfileNavigation from '../../components/profile-page-components/profile-navigation/ProfileNavigation'

import { profileNavigationData } from './constant'

import styles from './Profile.module.css'

export default function Profile(): ReactElement {
    return (
        <div className={styles.profile}>
            <ProfileNavigation navigationData={profileNavigationData} />

            <div className={styles.profile_content}>
                <Outlet />
            </div>
        </div>
    )
}
