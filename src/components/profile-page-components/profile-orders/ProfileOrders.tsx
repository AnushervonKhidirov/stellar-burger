import type { FC } from 'react'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { wsProfileConnectAction, wsProfileDisconnectAction } from '../../../services/store/profile-orders/actions'
import OrderList from '../../orders-components/order-list/OrderList'

import { WS_ORDERS_PROFILE_URL } from '../../../utils/constants'
import { profileOrderSelector } from '../../../utils/selectors'

const ProfileOrders: FC = () => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(profileOrderSelector)

    useEffect(() => {
        dispatch(wsProfileConnectAction(WS_ORDERS_PROFILE_URL))

        return () => {
            dispatch(wsProfileDisconnectAction())
        }
    }, [dispatch])
    return <OrderList orders={orders.list.orders} showStatus />
}

export default ProfileOrders
