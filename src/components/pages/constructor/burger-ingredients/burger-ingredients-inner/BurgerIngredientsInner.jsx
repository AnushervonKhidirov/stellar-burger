import PropTypes from 'prop-types'
import { useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../../../store/modalSlice'
import { setDetail } from '../../../../../store/ingredientDetailSlice'

import { ConstructorContext, IngredientContext } from '../../../../../utils/context'
import { ingredientDataTypes } from '../../../../../utils/types'
import IngredientDetails from '../../../../common/modal/ingredient-details/IngredientDetails'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerIngredients.module.css'

function BurgerIngredientsInner() {
    const { setScrollPosition, currentTab, typesPosition, isAutoscroll } = useContext(IngredientContext)
    const { ingredientList } = useContext(ConstructorContext)
    const constructorData = separateByTypes(ingredientList)
    const scrollRef = useRef(null)

    function showScrollPosition(e) {
        setScrollPosition(scrollRef.current?.scrollTop)
    }

    useEffect(() => {
        if (isAutoscroll) scrollRef.current.scrollTo(0, typesPosition[currentTab].top)
    }, [currentTab, typesPosition, isAutoscroll])

    return (
        <div className={`${styles.ingredients_inner} custom-scroll`} ref={scrollRef} onScroll={showScrollPosition}>
            {constructorData.map((item, index) => (
                <IngredientsTypeList type={item.type} parentTop={scrollRef.current?.getBoundingClientRect().top} list={item.list} key={index} />
            ))}
        </div>
    )
}

function IngredientsTypeList({ type, list, parentTop = 0 }) {
    const { setTypesPosition } = useContext(IngredientContext)
    const hRef = useRef(null)
    const headline = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки',
    }

    useEffect(() => {
        setTypesPosition(prev => {
            prev[type].top = Math.round(hRef.current?.getBoundingClientRect().top - parentTop)
            prev[type].bottom = Math.round(hRef.current?.getBoundingClientRect().bottom - parentTop)
            return prev
        })
    }, [setTypesPosition, type, parentTop])

    return (
        <div className={styles.constructor_type_list} data-title={type} ref={hRef}>
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
    const dispatch = useDispatch()

    const { setIngredientList, setPeakedIngredientList } = useContext(ConstructorContext)
    const { image, price, name } = data

    function showIngredientProperty(data) {
        dispatch(setDetail(data))
        dispatch(openModal(<IngredientDetails ingredient={data} />))
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
