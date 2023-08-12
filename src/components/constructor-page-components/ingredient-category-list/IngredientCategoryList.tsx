import type { FC } from 'react'
import type { Ingredient, ICategoriesPosition, IngredientCategories } from '../../../utils/interfaces'

import { useEffect, useRef } from 'react'
import { useAppDispatch } from '../../../utils/hooks'
import { setTypesPosition } from '../../../services/store/ingredient-tabs/slice'
import IngredientItem from '../ingredient-item/IngredientItem'

import { headlines } from './constant'
import styles from './IngredientCategoryList.module.css'

interface ICategoryListProps {
    category: IngredientCategories
    list: Ingredient[]
    parentTopPosition: number
}

const IngredientCategoryList: FC<ICategoryListProps> = ({ category, list, parentTopPosition = 0 }) => {
    const dispatch = useAppDispatch()
    const ingredientTypeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ingredientTypeRef.current) {
            const typeData: ICategoriesPosition = {
                category: category,
                top: Math.round(
                    ingredientTypeRef.current.getBoundingClientRect().top - parentTopPosition
                ),
                bottom: Math.round(
                    ingredientTypeRef.current.getBoundingClientRect().bottom - parentTopPosition
                ),
            }

            dispatch(setTypesPosition(typeData))
        }
    }, [dispatch, category, parentTopPosition])

    return (
        <div data-title={category} ref={ingredientTypeRef}>
            <h2 id={category} className='headline text text_type_main-medium'>
                {headlines[category]}
            </h2>
            <ul className={`${styles.ingredient_type} pl-4 pr-4 pt-6 pb-10`}>
                {list.map(item => (
                    <IngredientItem data={item} key={item._id} />
                ))}
            </ul>
        </div>
    )
}

export default IngredientCategoryList
