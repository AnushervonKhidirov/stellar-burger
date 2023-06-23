import { useSelector } from 'react-redux'
import Loader from '../loader/Loader'
import Rejected from '../rejected/Rejected'
import doneImage from '../../../images/order_done.png'

function OrderDetails() {
    const order = useSelector(store => store.orderDetails)

    return order.isLoading ? <Loader /> : order.rejected ? <Rejected /> : (
        <>
            <p className='text text_type_digits-large mb-8 mt-15' style={mainDigitStyles}>
                {order.orderNumber}
            </p>
            <h2 className='text text_type_main-medium mt-4'>Идентификатор заказа</h2>
            <img src={doneImage} alt="Done" className='mt-15 mb-15' style={doneIconStyles} />
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

const mainDigitStyles = {
    textShadow: '0 0 0.1em #4c4cff',
}

const doneIconStyles = {
    width: '120px',
    height: '120px',
}

export default OrderDetails
