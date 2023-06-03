import PropTypes from 'prop-types'
import { useContext } from 'react'
import { ConstructorContext, ModalContext } from '../../../../../utils/context'
import { ingredientDataTypes } from '../../../../../utils/types'
import IngredientDetails from '../../../../common/modal/ingredient-details/IngredientDetails'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerIngredients.module.css'

function BurgerIngredientsInner() {
    const { ingredientList } = useContext(ConstructorContext)
    const constructorData = separateByTypes(ingredientList)

    return (
        <div className={`${styles.ingredients_inner} custom-scroll`}>
            {constructorData.map((item, index) => (
                <IngredientsTypeList type={item.type} list={item.list} key={index} />
            ))}
        </div>
    )
}

function IngredientsTypeList({ type, list }) {
    const headline = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки',
    }

    return (
        <div className={styles.constructor_type_list} data-title={type}>
            <h2 id={type} className='headline text text_type_main-medium'>
                {headline[type]}
            </h2>
            <ul className={`${styles.ingredient_elements} pl-4 pr-4 pt-6 pb-10`}>
                {list.map(item => (
                    <BurgerElement data={item} key={item._id} />
                ))}
            </ul>
        </div>
    )
}

function BurgerElement({ data }) {
    const { modalDispatch } = useContext(ModalContext)
    const { setIngredientList, setPeakedIngredientList } = useContext(ConstructorContext)
    const { image, price, name } = data

    function showIngredientProperty(data) {
        modalDispatch({ type: 'open', payload: <IngredientDetails ingredient={data} /> })
    }

    function addToConstructor(data) {
        // TODO: bun amount checking
        if (data.type === 'bun' && data.amount > 0) {
            alert("WTF? you can't eat burger with 2 bund")
            return
        }

        setIngredientList(prev =>
            prev.map(ing => ing._id === data._id ? { ...ing, amount: ing.amount + 1, peakId: ing.peakId + 1 } : ing)
        )
        setPeakedIngredientList(prev => [...prev, data])
    }

    return (
        <li className={styles.list_item} onClick={() => addToConstructor(data)}>
            <img className={styles.image} src={image} alt={name} />
            <div className={`${styles.price} text text_type_digits-default`}>
                <span>{price}</span>
                <CurrencyIcon type='primary' />
            </div>
            <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
            {data.amount ? <Counter count={data.amount} size='default' /> : null}
        </li>
    )
}

function separateByTypes(arr) {
    const newArr = [
        {
            type: 'bun',
            list: [],
        },
        {
            type: 'sauce',
            list: [],
        },
        {
            type: 'main',
            list: [],
        },
    ]

    arr.forEach(item => {
        newArr.find(elem => elem.type === item.type).list.push(item)
    })

    return newArr
}

BurgerElement.propTypes = {
    data: ingredientDataTypes,
}

IngredientsTypeList.propTypes = {
    type: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(ingredientDataTypes).isRequired,
}

export default BurgerIngredientsInner
