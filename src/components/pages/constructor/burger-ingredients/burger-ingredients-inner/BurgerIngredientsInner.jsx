import PropTypes from 'prop-types'
import { ingredientDataTypes } from '../../../../../utils/types'

import { useSelector, useDispatch } from 'react-redux'
import { setTypesPosition, setScrollPosition } from '../../../../../store/ingredientTabSlice'
import { openModal } from '../../../../../store/modalSlice'
import { setDetail } from '../../../../../store/ingredientDetailSlice'

import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../../../../common/modal/ingredient-details/IngredientDetails'
import Loader from '../../../../common/loader/Loader'
import Rejected from '../../../../common/rejected/Rejected'
import styles from '../BurgerIngredients.module.css'

function BurgerIngredientsInner() {
    const dispatch = useDispatch()
    const { isAutoScroll, ingredientsTypePosition, currentTab } = useSelector(store => store.ingredientTab)

    const ingredientList = useSelector(store => store.ingredientList)

    const separatedList = separateByTypes(ingredientList.ingredients)
    const scrollRef = useRef(null)

    function scrollHandler() {
        if (!isAutoScroll) dispatch(setScrollPosition(scrollRef.current?.scrollTop))
    }

    useEffect(() => {
        if (isAutoScroll) scrollRef.current.scrollTo(0, ingredientsTypePosition[currentTab].top)
    }, [dispatch, isAutoScroll, ingredientsTypePosition, currentTab])

    return (
        <div className={`${styles.ingredients_inner} custom-scroll`} ref={scrollRef} onScroll={scrollHandler}>
            {ingredientList.isLoading ? (
                <Loader />
            ) : ingredientList.rejected ? (
                <Rejected />
            ) : (
                separatedList.map(item => (
                    <IngredientsTypeList
                        type={item.type}
                        parentTopPosition={scrollRef.current?.getBoundingClientRect().top}
                        list={item.list}
                        key={item.type}
                    />
                ))
            )}
        </div>
    )
}

function IngredientsTypeList({ type, list, parentTopPosition = 0 }) {
    const dispatch = useDispatch()
    const hRef = useRef(null)

    const headline = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки',
    }

    useEffect(() => {
        const typeData = {
            type: type,
            top: Math.round(hRef.current?.getBoundingClientRect().top - parentTopPosition),
            bottom: Math.round(hRef.current?.getBoundingClientRect().bottom - parentTopPosition),
        }

        dispatch(setTypesPosition(typeData))
    }, [dispatch, type, parentTopPosition])

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
    const amount = useSelector(store => store.constructorIngredientList.amounts[data._id])

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
    })

    function showIngredientProperty(data) {
        dispatch(setDetail(data))
        dispatch(openModal(<IngredientDetails />))
    }

    return (
        <li className={styles.list_item} onClick={() => showIngredientProperty(data)} ref={dragRef}>
            <img className={styles.image} src={data.image} alt={data.name} />
            <div className={`${styles.price} text text_type_digits-default`}>
                <span>{data.price}</span>
                <CurrencyIcon type='primary' />
            </div>
            <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
            {amount ? <Counter count={amount} size='default' /> : null}
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
    parentTopPosition: PropTypes.number,
}

export default BurgerIngredientsInner
