import PropTypes from 'prop-types'
import { ingredientDataTypes } from '../../../utils/types'

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTypesPosition } from '../../../store/ingredientTabSlice'

import IngredientItem from '../ingredient-item/IngredientItem'

export default function IngredientTypeList({ type, list, parentTopPosition = 0 }) {
    const dispatch = useDispatch()
    const ingredientTypeRef = useRef(null)

    const headline = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки',
    }

    useEffect(() => {
        const typeData = {
            type: type,
            top: Math.round(ingredientTypeRef.current?.getBoundingClientRect().top - parentTopPosition),
            bottom: Math.round(ingredientTypeRef.current?.getBoundingClientRect().bottom - parentTopPosition),
        }

        dispatch(setTypesPosition(typeData))
    }, [dispatch, type, parentTopPosition])

    return (
        <div data-title={type} ref={ingredientTypeRef}>
            <h2 id={type} className='headline text text_type_main-medium'>
                {headline[type]}
            </h2>
            <ul className='pl-4 pr-4 pt-6 pb-10' style={ingredientTypeStyle}>
                {list.map(item => (
                    <IngredientItem data={item} key={item._id} />
                ))}
            </ul>
        </div>
    )
}

IngredientTypeList.propTypes = {
    type: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    parentTopPosition: PropTypes.number,
}

const ingredientTypeStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px 24px',
    listStyleType: 'none',
    margin: '0',
}
