import type { FC } from 'react'
import type { Ingredient, IngredientCategories } from '../../../utils/interfaces'

import { useEffect, useRef, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { setScrollPosition } from '../../../services/ingredient-tabs/slice'
import Loader from '../../common/loader/Loader'
import Rejected from '../../common/rejected/Rejected'
import IngredientCategoryList from '../ingredient-category-list/IngredientCategoryList'
import { ingredientSelector } from '../../../utils/selectors'

import styles from './BurgerIngredientList.module.css'

interface ISeparatedCategories {
    category: IngredientCategories
    list: Ingredient[]
}

const BurgerIngredientList: FC = () => {
    const dispatch = useAppDispatch()

    const scrollRef = useRef<HTMLDivElement>(null)
    const ingredientList = useAppSelector(ingredientSelector)
    const { isAutoScroll, ingredientsTypePosition, currentTab } = useAppSelector(
        store => store.ingredientTab
    )

    const separatedList = useMemo(
        () => separateByTypes(ingredientList.ingredients),
        [ingredientList.ingredients]
    )

    function scrollHandler() {
        if (!isAutoScroll && scrollRef.current)
            dispatch(setScrollPosition(scrollRef.current?.scrollTop))
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
                        category={item.category}
                        parentTopPosition={
                            scrollRef.current ? scrollRef.current.getBoundingClientRect().top : 0
                        }
                        list={item.list}
                        key={item.category}
                    />
                ))
            )}
        </div>
    )
}

function separateByTypes(ingredients: Ingredient[]): ISeparatedCategories[] {
    const separatedIngredients: ISeparatedCategories[] = [
        {
            category: 'bun',
            list: [],
        },
        {
            category: 'sauce',
            list: [],
        },
        {
            category: 'main',
            list: [],
        },
    ]

    ingredients.forEach((item: Ingredient) => {
        separatedIngredients
            .find((elem: ISeparatedCategories) => elem.category === item.type)
            ?.list.push(item)
    })

    return separatedIngredients
}

export default BurgerIngredientList
