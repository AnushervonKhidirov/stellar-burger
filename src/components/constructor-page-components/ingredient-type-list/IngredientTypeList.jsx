import PropTypes from 'prop-types'
import { ingredientDataType } from '../../../utils/types'

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTypesPosition } from '../../../services/store/ingredientTabSlice'
import IngredientItem from '../ingredient-item/IngredientItem'

import { headlines } from './constant'

import styles from './IngredientTypeList.module.css'

export default function IngredientTypeList({ type, list, parentTopPosition = 0 }) {
    const dispatch = useDispatch()
    const ingredientTypeRef = useRef(null)

    useEffect(() => {
        const typeData = {
            type: type,
            top: Math.round(
                ingredientTypeRef.current?.getBoundingClientRect().top - parentTopPosition
            ),
            bottom: Math.round(
                ingredientTypeRef.current?.getBoundingClientRect().bottom - parentTopPosition
            ),
        }

        dispatch(setTypesPosition(typeData))
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

IngredientTypeList.propTypes = {
    type: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(ingredientDataType).isRequired,
    parentTopPosition: PropTypes.number,
}
