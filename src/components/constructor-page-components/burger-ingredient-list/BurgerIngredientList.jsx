import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setScrollPosition } from '../../../services/store/ingredientTabSlice'

import Loader from '../../common/loader/Loader'
import Rejected from '../../common/rejected/Rejected'
import IngredientTypeList from '../ingredient-type-list/IngredientTypeList'

export default function BurgerIngredientList() {
    const dispatch = useDispatch()
    const { isAutoScroll, ingredientsTypePosition, currentTab } = useSelector(
        store => store.ingredientTab
    )

    const ingredientList = useSelector(store => store.ingredientList)

    const separatedList = separateByTypes(ingredientList.ingredients)
    const scrollRef = useRef(null)

    function scrollHandler() {
        if (!isAutoScroll) dispatch(setScrollPosition(scrollRef.current?.scrollTop))
    }

    useEffect(() => {
        if (isAutoScroll) {
            scrollRef.current.scrollTo(0, ingredientsTypePosition[currentTab].top)
            dispatch(setScrollPosition(ingredientsTypePosition[currentTab].top))
        }
    }, [dispatch, isAutoScroll, ingredientsTypePosition, currentTab])

    return (
        <div
            className='custom-scroll'
            style={ingredientListStyle}
            ref={scrollRef}
            onScroll={scrollHandler}
        >
            {ingredientList.isLoading ? (
                <Loader />
            ) : ingredientList.rejected ? (
                <Rejected />
            ) : (
                separatedList.map(item => (
                    <IngredientTypeList
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

const ingredientListStyle = {
    position: 'relative',
    overflowY: 'auto',
    scrollBehavior: 'smooth',
}
