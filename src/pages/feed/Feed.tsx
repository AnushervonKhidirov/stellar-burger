import type { FC } from 'react'
import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { wsFeedConnectAction, wsFeedDisconnectAction } from '../../services/store/feed-orders/actions'

import OrderList from '../../components/orders-components/order-list/OrderList'
import IdList from '../../components/feed-page-components/id-list/IdList'
import DoneOrders from '../../components/feed-page-components/done-orders/DoneOrders'
import PageTitle from '../../components/common/page-title/PageTitle'

import { WS_ORDERS_FEED_URL } from '../../utils/constants'
import { feedOrderSelector } from '../../utils/selectors'

import styles from './Feed.module.css'

const Feed: FC = () => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(feedOrderSelector)

    useEffect(() => {
        dispatch(wsFeedConnectAction(WS_ORDERS_FEED_URL))

        return () => {
            dispatch(wsFeedDisconnectAction())
        }
    }, [dispatch])

    return (
        <div className={styles.feed_page}>
            <PageTitle title='Лента заказов' />
            <OrderList orders={orders.list.orders} />

            <div className={styles.orders_wrapper}>
                <IdList title='Готовы' list={orders.doneIdList} ready />
                <IdList title='В работе' list={orders.restIdList} />

                <DoneOrders
                    extraClass={styles.done_order}
                    title='Выполнено за все время'
                    amount={orders.list.total}
                />
                <DoneOrders
                    extraClass={styles.done_order}
                    title='Выполнено за сегодня'
                    amount={orders.list.totalToday}
                />
            </div>
        </div>
    )
}

export default Feed
