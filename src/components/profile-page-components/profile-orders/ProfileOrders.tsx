import type { FC } from 'react'
import OrderList from '../../orders-components/order-list/OrderList'
import img from '../../../images/order_done.png'

const ProfileOrders: FC = () => {
    const orderList = [
        {
            orderNumber: 1,
            date: new Date(),
            title: 'title',
            price: 5102,
            status: 'Создан',
            images: [img, img, img, img, img, img, img, img, img],
        },
        {
            orderNumber: 2,
            date: new Date(),
            title: 'title',
            price: 512,
            status: 'Готовится',
            images: [img, img, img],
        },
        {
            orderNumber: 3,
            date: new Date(),
            title: 'title',
            price: 512,
            status: 'Готовится',
            images: [img, img, img, img, img, img, img],
        },
        {
            orderNumber: 4,
            date: new Date(),
            title: 'title',
            price: 512,
            status: 'Выполнен',
            images: [img, img, img],
        },
        {
            orderNumber: 5,
            date: new Date(),
            title: 'title',
            price: 512,
            status: 'Выполнен',
            images: [img, img, img, img],
        },
    ]

    return <OrderList orders={orderList} />
}

export default ProfileOrders