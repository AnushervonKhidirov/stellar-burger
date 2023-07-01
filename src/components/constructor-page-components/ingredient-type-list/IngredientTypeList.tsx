import { useEffect, useRef } from 'react'
import { useAppDispatch } from '../../../utils/hooks'
import { setTypesPosition } from '../../../services/store/ingredientTabSlice'
import IngredientItem from '../ingredient-item/IngredientItem'

import { headlines } from './constant'

import styles from './IngredientTypeList.module.css'

import type { Ingredient, TypesPositionPayload, IngredientTypes } from '../../../utils/interfaces'

interface IngredientTypeListProps {
    type: IngredientTypes
    list: Ingredient[]
    parentTopPosition: number
}


export default function IngredientTypeList({ type, list, parentTopPosition = 0 }: IngredientTypeListProps) {
    const dispatch = useAppDispatch()
    const ingredientTypeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ingredientTypeRef.current) {
            const typeData: TypesPositionPayload = {
                type: type,
                top: Math.round(
                    ingredientTypeRef.current.getBoundingClientRect().top - parentTopPosition
                ),
                bottom: Math.round(
                    ingredientTypeRef.current.getBoundingClientRect().bottom - parentTopPosition
                ),
            }
    
            dispatch(setTypesPosition(typeData))
        }
    }, [dispatch, type, parentTopPosition])

    return (
        <div data-title={type} ref={ingredientTypeRef}>
            <h2 id={type} className='headline text text_type_main-medium'>
                {headlines[type]}
            </h2>
            <ul className={`${styles.ingredient_type} pl-4 pr-4 pt-6 pb-10`}>
                {list.map(item => (
                    <IngredientItem data={item} key={item._id} />
                ))}
            </ul>
        </div>
    )
}
