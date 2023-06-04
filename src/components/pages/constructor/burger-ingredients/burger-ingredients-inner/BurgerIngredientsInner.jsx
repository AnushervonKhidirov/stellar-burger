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

    function addToConstructor(newIng) {
        if (newIng.type === 'bun') {
            if (newIng.amount > 0) {
                alert("You can't eat burger with 2 bund")
                return
            }
        }

        setIngredientList(prev => {
            return prev.map(ing => {
                if (ing._id === newIng._id) {
                    return { ...ing, amount: ing.amount + 1, peakId: ing.peakId + 1 }
                } else if (ing.type === 'bun' && newIng.type === 'bun' && ing._id !== newIng._id) {
                    return { ...ing, amount: 0 }
                } else {
                    return ing
                }
            })
        })

        setPeakedIngredientList(prev => {
            const newList = []

            if (newIng.type === 'bun') {
                const indexToRemove = prev.findIndex(
                    listItem => listItem.type === 'bun' && newIng.type === 'bun' && listItem._id !== newIng._id
                )

                if (indexToRemove !== -1) {
                    prev.forEach((ing, index) => {
                        if (indexToRemove !== index) newList.push(ing)
                    })

                    return [...newList, newIng]
                }
            }

            return [...prev, newIng]
        })
    }

    return (
        <li className={styles.list_item} onClick={() => showIngredientProperty(data)}>
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
