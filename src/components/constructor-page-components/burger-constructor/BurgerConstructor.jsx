import { useSelector, useDispatch } from 'react-redux'
import { addIngredientToConstructor } from '../../../services/store/constructorIngredientListSlice'

import { useDrop } from 'react-dnd'

import BurgerConstructorBun from '../burger-constructor-bun/BurgerConstructorBun'
import BurgerConstructorIngredients from '../burger-constructor-ingredients/BurgerConstructorIngredients'
import OrderBlock from '../order-block/OrderBlock'

export default function BurgerConstructor() {
    return (
        <div style={{ position: 'relative' }}>
            <BurgerConstructorBlock />
            <OrderBlock />
        </div>
    )
}

function BurgerConstructorBlock() {
    const dispatch = useDispatch()
    const constructorList = useSelector(store => store.constructorIngredientList)

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            dispatch(addIngredientToConstructor(ingredient))
        },
    })

    return (
        <div style={constructorStyle} ref={dropRef}>
            <BurgerConstructorBun position='top' />
            <BurgerConstructorIngredients ingredientList={constructorList.ingredients} />
            <BurgerConstructorBun position='bottom' />
        </div>
    )
}

const constructorStyle = {
    position: 'absolute',
    top: '100px',
    display: 'flex',
    width: 'calc(100% - 20px)',
    height: '560px',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '16px',
}