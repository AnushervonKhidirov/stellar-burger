import PropTypes from 'prop-types'
import { ingredientDataTypes, burgerIngredientsPropTypes } from '../../../../../types'
import IngredientDetails from '../../../../common/modal/ingredient-details/IngredientDetails'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerIngredients.module.css'

function BurgerIngredientsInner({ data, modalHandler }) {
    const constructorData = separateByTypes(data)

    function showIngredientProperty(data) {
        modalHandler(<IngredientDetails ingredient={data} />)
    }

    return (
        <div className={`${styles.ingredients_inner} custom-scroll`}>
            {constructorData.map((item, index) => (
                <IngredientsTypeList
                    type={item.type}
                    list={item.list}
                    key={index}
                    showIngredientProperty={showIngredientProperty}
                />
            ))}
        </div>
    )
}

function IngredientsTypeList({ type, list, showIngredientProperty }) {
    const headline = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки',
    }

    return (
        <div className={styles.constructor_type_list} data-title={type}>
            <h2 className='headline text text_type_main-medium'>{headline[type]}</h2>
            <ul className={`${styles.ingredient_elements} pl-4 pr-4 pt-6 pb-10`}>
                {list.map(item => (
                    <BurgerElement data={item} showIngredientProperty={showIngredientProperty} key={item._id} />
                ))}
            </ul>
        </div>
    )
}

function BurgerElement({ data, showIngredientProperty }) {
    const { image, price, name } = data

    return (
        <li className={styles.list_item} onClick={() => showIngredientProperty(data)}>
            <img className={styles.image} src={image} alt={name} />
            <div className={`${styles.price} text text_type_digits-default`}>
                <span>{price}</span>
                <CurrencyIcon type='primary' />
            </div>
            <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
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

// BurgerIngredientsInner.propTypes = burgerIngredientsPropTypes

BurgerElement.propTypes = {
    data: ingredientDataTypes.isRequired,
    showIngredientProperty: PropTypes.func.isRequired,
}

IngredientsTypeList.propTypes = {
    type: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    showIngredientProperty: PropTypes.func.isRequired,
}

export default BurgerIngredientsInner
