import type { FC } from 'react'
import type { Ingredient, IngredientCategories } from '../../../utils/interfaces'

import { useEffect, useRef, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { setScrollPosition } from '../../../services/store/ingredientTabSlice'
import Loader from '../../common/loader/Loader'
import Rejected from '../../common/rejected/Rejected'
import IngredientCategoryList from '../ingredient-category-list/IngredientCategoryList'

import styles from './BurgerIngredientList.module.css'

interface ISeparatedCategories {
    type: IngredientCategories
    list: Ingredient[]
}

const BurgerIngredientList: FC = () => {
    const dispatch = useAppDispatch()

    const scrollRef = useRef<HTMLDivElement>(null)
    const ingredientList = useAppSelector(store => store.ingredientList)
    const { isAutoScroll, ingredientsTypePosition, currentTab } = useAppSelector(
        store => store.ingredientTab
    )

    const separatedList = useMemo(
        () => separateByTypes(ingredientList.ingredients),
        [ingredientList.ingredients]
    )

    function scrollHandler() {
        if (!isAutoScroll) dispatch(setScrollPosition(scrollRef.current?.scrollTop))
    }

    useEffect(() => {
        if (isAutoScroll) {
            scrollRef.current?.scrollTo(0, ingredientsTypePosition[currentTab].top)
            dispatch(setScrollPosition(ingredientsTypePosition[currentTab].top))
        }
    }, [dispatch, isAutoScroll, ingredientsTypePosition, currentTab])

    return (
        <div
            className={`${styles.ingredient_list} custom-scroll`}
            ref={scrollRef}
            onScroll={scrollHandler}
        >
            {ingredientList.isLoading ? (
                <Loader />
            ) : ingredientList.rejected ? (
                <Rejected />
            ) : (
                separatedList.map(item => (
                    <IngredientCategoryList
                        category={item.type}
                        parentTopPosition={
                            scrollRef.current ? scrollRef.current.getBoundingClientRect().top : 0
                        }
                        list={item.list}
                        key={item.type}
                    />
                ))
            )}
        </div>
    )
}

function separateByTypes(ingredients: Ingredient[]): ISeparatedCategories[] {
    const separatedIngredients: ISeparatedCategories[] = [
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

    ingredients.forEach((item: Ingredient) => {
        separatedIngredients.find((elem: ISeparatedCategories) => elem.type === item.type)?.list.push(item)
    })

    return separatedIngredients
}

export default BurgerIngredientList
